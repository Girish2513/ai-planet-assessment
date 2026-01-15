import { Handle, Position } from "reactflow";

export default function LLMNode() {
  return (
    <div style={styles.node}>
      <strong>LLM (OpenAI)</strong>

      <label style={styles.label}>Model</label>
      <select style={styles.select}>
        <option>GPT-4o-mini</option>
        <option>GPT-4</option>
      </select>

      <label style={styles.label}>Prompt</label>
      <textarea
        style={styles.textarea}
        placeholder="Write your custom prompt here"
      />

      {/* Inputs */}
      <Handle type="target" position={Position.Left} id="query" />
      <Handle
        type="target"
        position={Position.Left}
        id="context"
        style={{ top: "70%" }}
      />

      {/* Output */}
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
}

const styles = {
  node: {
    padding: "10px",
    width: "260px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px"
  },
  label: {
    fontSize: "12px",
    marginTop: "8px",
    display: "block"
  },
  select: {
    width: "100%",
    padding: "6px",
    marginTop: "4px"
  },
  textarea: {
    width: "100%",
    height: "60px",
    marginTop: "4px",
    padding: "6px",
    fontSize: "12px"
  }
};
