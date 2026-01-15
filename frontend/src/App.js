import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyStacks from "./pages/MyStacks";
import Builder from "./pages/Builder";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MyStacks />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
