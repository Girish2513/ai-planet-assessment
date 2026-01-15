import { useState } from "react";
import CreateStackModal from "../components/CreateStackModal";


export default function MyStacks() {
    const [showModal, setShowModal] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h2>My Stacks</h2>
        <button style={styles.newBtn} onClick={() => setShowModal(true)}>
  + New Stack
</button>

      </div>

      <div style={styles.centerCard}>
        <h3>Create New Stack</h3>
        <p>
          Start building your generative AI apps with our essential tools and frameworks
        </p>
        <button style={styles.newBtn} onClick={() => setShowModal(true)}>
  + New Stack
</button>

      </div>
    {showModal && <CreateStackModal onClose={() => setShowModal(false)} />}  
    </div>
  );

}

const styles = {
  container: {
    padding: "30px"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  newBtn: {
    backgroundColor: "#2f855a",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  centerCard: {
    marginTop: "120px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "360px",
    textAlign: "center",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  createBtn: {
    marginTop: "15px",
    backgroundColor: "#2f855a",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
