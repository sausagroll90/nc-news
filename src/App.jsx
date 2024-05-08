import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/contexts";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";

function App() {
  const [user, setUser] = useState("weegembump");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <header>
        <Header />
      </header>
      <nav>
        <NavBar />
      </nav>
      <main>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
