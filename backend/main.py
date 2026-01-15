from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque
import requests
import os
from dotenv import load_dotenv
from groq import Groq
from fastapi import UploadFile, File
from pdf_utils import extract_text_from_pdf, chunk_text
from vector_store import add_documents, query_documents

load_dotenv()

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str

class Edge(BaseModel):
    from_: str = Field(alias="from")
    to: str

    class Config:
        populate_by_name = True

class Workflow(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class ChatRequest(BaseModel):
    workflow: Workflow
    query: str

def validate_workflow(workflow):
    node_types = [node.type for node in workflow.nodes]

    if node_types.count("userQuery") != 1:
        raise ValueError("Exactly one User Query node required")

    if node_types.count("output") != 1:
        raise ValueError("Exactly one Output node required")

    if "llm" not in node_types:
        raise ValueError("At least one LLM node required")

def get_execution_order(workflow):
    graph = defaultdict(list)
    indegree = defaultdict(int)

    for edge in workflow.edges:
        graph[edge.from_].append(edge.to)
        indegree[edge.to] += 1

    queue = deque()
    for node in workflow.nodes:
        if indegree[node.id] == 0:
            queue.append(node.id)

    order = []
    while queue:
        current = queue.popleft()
        order.append(current)

        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    if len(order) != len(workflow.nodes):
        raise ValueError("Cycle detected")

    return order
# def call_llm(prompt: str):
#     response = requests.post(
#         HF_API_URL,
#         headers=HF_HEADERS,
#         json={
#             "inputs": prompt,
#             "parameters": {
#                 "max_new_tokens": 200,
#                 "temperature": 0.7
#             }
#         }
#     )
#     result = response.json()


def execute_node(node_type, state):
    if node_type == "knowledgeBase":
        query = state.get("query")
        if query:
            docs = query_documents(query)
            state["context"] = "\n".join(docs)

    elif node_type == "llm":
        prompt = state.get("query", "")

        if state.get("context"):
            prompt = f"""
    Use the context below to answer the question.

    Context:
    {state['context']}

    Question:
    {state['query']}
    """

        completion = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        state["response"] = completion.choices[0].message.content

@app.post("/chat/run")
def run_chat(req: ChatRequest):
    workflow = req.workflow
    validate_workflow(workflow)

    order = get_execution_order(workflow)
    node_map = {node.id: node.type for node in workflow.nodes}

    state = {"query": req.query}

    for node_id in order:
        execute_node(node_map[node_id], state)

    return {"response": state.get("response")}


@app.post("/knowledge/upload")
async def upload_document(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)

    add_documents(chunks)

    return {
        "message": "Document processed and stored",
        "chunks": len(chunks)
    }