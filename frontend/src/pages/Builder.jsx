import { useCallback, useState } from "react";
import ReactFlow, { addEdge } from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../components/Sidebar";
import ChatModal from "../components/ChatModal";

import UserQueryNode from "../components/nodes/UserQueryNode";
import KnowledgeBaseNode from "../components/nodes/KnowledgeBaseNode";
import LLMNode from "../components/nodes/LLMNode";
import OutputNode from "../components/nodes/OutputNode";

let id = 0;
const getId = () => `node_${id++}`;

const nodeTypes = {
  userQuery: UserQueryNode,
  knowledgeBase: KnowledgeBaseNode,
  llm: LLMNode,
  output: OutputNode
};

export default function Builder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const workflow = {
    nodes: nodes.map((n) => ({
      id: n.id,
      type: n.type
    })),
    edges: edges.map((e) => ({
      from: e.source,
      to: e.target
    }))
  };

  const onConnect = (params) =>
    setEdges((eds) => addEdge(params, eds));

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const position = {
      x: event.clientX - 250,
      y: event.clientY - 100
    };

    let nodeType = "default";
    if (type === "userQuery") nodeType = "userQuery";
    if (type === "knowledgeBase") nodeType = "knowledgeBase";
    if (type === "llm") nodeType = "llm";
    if (type === "output") nodeType = "output";

    const newNode = {
      id: getId(),
      type: nodeType,
      position,
      data: {}
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
      <Sidebar />

      <div style={{ flex: 1 }} onDrop={onDrop} onDragOver={onDragOver}>
        <button
          onClick={() => console.log("WORKFLOW:", workflow)}
          style={{
            position: "absolute",
            top: 80,
            right: 20,
            zIndex: 10,
            background: "#2f855a",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px"
          }}
        >
          Build Stack
        </button>

        <button
          onClick={() => setShowChat(true)}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            background: "#2f855a",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            zIndex: 20
          }}
        >
          Chat with Stack
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </div>

      {showChat && (
        <ChatModal
          workflow={workflow}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}
