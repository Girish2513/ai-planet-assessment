export default function Header() {
  return (
    <div style={styles.header}>
      <h2 style={styles.logo}>GenAI Stack</h2>
    </div>
  );
}

const styles = {
  header: {
    height: "60px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #eee",
    display: "flex",
    alignItems: "center",
    padding: "0 20px"
  },
  logo: {
    color: "#2f855a",
    fontWeight: "600"
  }
};
