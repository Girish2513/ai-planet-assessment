import { useState } from "react";

export default function ChatModal({ workflow, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    setMessages((msgs) => [...msgs, { role: "user", content: input }]);

    const res = await fetch("http://127.0.0.1:8000/chat/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflow,
        query: input
      })
    });

    const data = await res.json();

    setMessages((msgs) => [
      ...msgs,
      { role: "assistant", content: data.response }
    ]);

    setInput("");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Chat with Stack</h3>

        <div style={styles.chat}>
          {messages.map((m, i) => (
            <div key={i} style={styles[m.role]}>
              {m.content}
            </div>
          ))}
        </div>

        <div style={styles.inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    width: "500px",
    height: "500px",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column"
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px"
  },
  user: {
    textAlign: "right",
    margin: "5px",
    color: "#2f855a"
  },
  assistant: {
    textAlign: "left",
    margin: "5px"
  },
  inputRow: {
    display: "flex",
    gap: "8px"
  }
};
