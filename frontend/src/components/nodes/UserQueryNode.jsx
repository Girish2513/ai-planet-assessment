import { Handle, Position } from "reactflow";

export default function UserQueryNode() {
  return (
    <div style={styles.node}>
      <strong>User Query</strong>

      <input
        style={styles.input}
        placeholder="Enter your query here"
        disabled
      />

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="query"
      />
    </div>
  );
}

const styles = {
  node: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
    width: "180px"
  },
  input: {
    marginTop: "8px",
    width: "100%",
    padding: "6px",
    fontSize: "12px"
  }
};
