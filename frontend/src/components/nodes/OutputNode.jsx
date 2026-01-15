import { Handle, Position } from "reactflow";

export default function OutputNode() {
  return (
    <div style={styles.node}>
      <strong>Output</strong>

      <p style={styles.text}>
        Output of the workflow will be shown here
      </p>

      {/* Input */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
      />
    </div>
  );
}

const styles = {
  node: {
    padding: "10px",
    width: "200px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px"
  },
  text: {
    fontSize: "12px",
    color: "#555",
    marginTop: "8px"
  }
};
