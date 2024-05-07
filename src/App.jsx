import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
