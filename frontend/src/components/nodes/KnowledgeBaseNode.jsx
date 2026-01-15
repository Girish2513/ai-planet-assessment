import { Handle, Position } from "reactflow";

export default function KnowledgeBaseNode() {
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Only allow PDFs
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/knowledge/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      alert(`PDF uploaded successfully.\nChunks created: ${data.chunks}`);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  return (
    <div style={styles.node}>
      <strong>Knowledge Base</strong>
      <p style={styles.text}>
        Let LLM search info in your file
      </p>

      {/* REAL FILE INPUT */}
      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        style={styles.fileInput}
      />

      {/* Input: Query */}
      <Handle
        type="target"
        position={Position.Left}
        id="query"
      />

      {/* Output: Context */}
      <Handle
        type="source"
        position={Position.Right}
        id="context"
      />
    </div>
  );
}

const styles = {
  node: {
    padding: "10px",
    width: "220px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px"
  },
  text: {
    fontSize: "12px",
    color: "#555",
    marginTop: "6px"
  },
  fileInput: {
    marginTop: "10px",
    fontSize: "12px"
  }
};
