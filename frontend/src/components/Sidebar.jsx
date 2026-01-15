const components = [
  { type: "userQuery", label: "User Query" },
  { type: "knowledgeBase", label: "Knowledge Base" },
  { type: "llm", label: "LLM (OpenAI)" },
  { type: "output", label: "Output" }
];

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={styles.sidebar}>
      <h4>Components</h4>

      {components.map((comp) => (
        <div
          key={comp.type}
          style={styles.item}
          draggable
          onDragStart={(e) => onDragStart(e, comp.type)}
        >
          {comp.label}
        </div>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    padding: "15px",
    borderRight: "1px solid #ddd",
    background: "#fafafa"
  },
  item: {
    padding: "10px",
    marginTop: "10px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "grab"
  }
};
