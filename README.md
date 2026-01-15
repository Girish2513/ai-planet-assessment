# AI Planet Assessment – GenAI Workflow Builder

This repository contains a full-stack **GenAI workflow builder** that allows users to visually create and execute intelligent AI pipelines using a **no-code / low-code interface**.

Users can connect components such as user input, knowledge bases, LLMs, and output nodes to build custom AI workflows and interact with them via a chat interface.

---

## 🚀 Key Features

- Visual workflow builder using drag-and-drop
- Directed Acyclic Graph (DAG) based workflow execution
- Chat interface for interacting with workflows
- Knowledge Base with PDF upload and semantic search (RAG)
- LLM integration using Groq (LLaMA 3.1)
- Fully Dockerized frontend and backend

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Flow (workflow builder)

### Backend
- FastAPI (Python)
- Groq API (LLM – LLaMA 3.1)
- ChromaDB (Vector Database)
- Sentence Transformers (Embeddings)
- PyMuPDF (PDF text extraction)

### Deployment
- Docker
- Docker Compose

---

## 🧠 System Overview

1. Users build workflows visually using drag-and-drop components
2. The frontend converts the workflow graph into JSON
3. The backend validates the workflow and computes execution order
4. Each node executes sequentially using shared state
5. The Knowledge Base retrieves relevant document context (RAG)
6. The LLM generates responses
7. The Output node displays responses in chat format

---

## 📄 Retrieval-Augmented Generation (RAG)

- PDF documents are uploaded during workflow setup
- Text is extracted, chunked, and embedded
- Embeddings are stored in ChromaDB
- Relevant chunks are retrieved during execution and injected into the LLM prompt

---

## 📦 Prerequisites

- Node.js (v18.x or higher)
- Python (v3.10 or higher)
- Docker (for containerized deployment)
- pip (Python package installer)

---

## 🖥 Frontend (React.js)

### Setup

```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000 to view it in your browser.

### Build (Production)

```bash
npm run build
```

### Docker (Optional)

```bash
docker build -t frontend .
docker run -p 3000:3000 frontend
```

---

## ⚙ Backend (FastAPI)

### Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Run (Development Mode)

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The backend will be available at http://localhost:8000.

### Docker (Optional)

```bash
docker build -t backend .
docker run -p 8000:8000 backend
```

---

## 🐳 Docker Compose (Recommended)

From the project root:

```bash
docker compose build
docker compose up
```

- Frontend: http://localhost:3000  
- Backend API Docs: http://localhost:8000/docs

---

## 🔌 Backend API Endpoints

- **POST /chat/run** – Execute a workflow via chat  
- **POST /knowledge/upload** – Upload PDF documents for the Knowledge Base

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
GROQ_API_KEY=your_api_key_here
```

---

## 📌 Deployment Notes

- The application is fully containerized using Docker
- Kubernetes deployment is optional and not included
- PostgreSQL is not used; ChromaDB is used as a vector database for RAG
- The architecture supports adding relational persistence in future iterations

---

## 🎥 Demo

A demo video demonstrating:

- Workflow creation
- PDF upload
- Chat execution
- Dockerized setup

is provided separately as part of the submission.

---

## 👤 Author

Girish Saana