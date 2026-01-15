# AI Planet Assessment

This repository contains a full-stack application comprising a **frontend** (React.js) and a **backend** (FastAPI). Below, you'll find instructions for setting up and running the project.

## Prerequisites
- Node.js (v18.x or higher)
- Python (v3.10 or higher)
- Docker (optional for containerized deployments)
- `pip` (Python package installer)

---

## Frontend (React.js)

### Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Run (Development Mode)
- Start the development server:
  ```bash
  npm start
  ```
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page reloads on file changes.

### Build (Production)
- Build the app for production:
  ```bash
  npm run build
  ```
- The build artifacts will be stored in the `build/` directory.

### Docker (Optional)
- Build the Docker image:
  ```bash
  docker build -t frontend .
  ```
- Run the frontend container:
  ```bash
  docker run -p 3000:3000 frontend
  ```

---

## Backend (FastAPI)

### Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Run (Development Mode)
- Start the FastAPI server:
  ```bash
  uvicorn main:app --host 0.0.0.0 --port 8000
  ```
- Your backend API should now be live at [http://localhost:8000](http://localhost:8000).

### Docker (Optional)
- Build the Docker image:
  ```bash
  docker build -t backend .
  ```
- Run the backend container:
  ```bash
  docker run -p 8000:8000 backend
  ```

---

## Additional Notes
### Backend Endpoints
- `/chat/run`: A POST endpoint to handle chat workflows.
- `/knowledge/upload`: Upload a PDF file for processing and storing in chunks.

### Environment Variables
- Ensure a `.env` file exists in the `backend` directory with the required keys (e.g., `GROQ_API_KEY`).

### Dependencies
- Python packages (in `backend`): `fastapi`, `pydantic`, `requests`, `chromadb`, `sentence_transformers`, etc.
- JavaScript packages (in `frontend`): Refer to `frontend/package.json`.

---

