import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.Client()
collection = client.get_or_create_collection(name="knowledge_base")

model = SentenceTransformer("all-MiniLM-L6-v2")


def add_documents(texts):
    embeddings = model.encode(texts).tolist()
    ids = [f"doc_{i}" for i in range(len(texts))]

    collection.add(
        documents=texts,
        embeddings=embeddings,
        ids=ids
    )


def query_documents(query, top_k=3):
    query_embedding = model.encode([query]).tolist()
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=top_k
    )
    return results["documents"][0]
