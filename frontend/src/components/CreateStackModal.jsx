import { useNavigate } from "react-router-dom";

export default function CreateStackModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Create New Stack</h3>

        <label>Name</label>
        <input style={styles.input} />

        <label>Description</label>
        <textarea style={styles.textarea}></textarea>

        <div style={styles.actions}>
          <button style={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button
            style={styles.create}
            onClick={() => navigate("/builder")}
          >
            Create
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    background: "#fff",
    padding: "25px",
    width: "400px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "8px"
  },
  textarea: {
    padding: "8px",
    height: "80px"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "15px"
  },
  cancel: {
    background: "transparent",
    border: "1px solid #ccc",
    padding: "6px 12px"
  },
  create: {
    background: "#2f855a",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px"
  }
};
