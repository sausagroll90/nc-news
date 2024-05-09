import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/contexts";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [user, setUser] = useState("weegembump");
  const [error, setError] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <header>
        <Header />
      </header>
      <nav>
        <NavBar setError={setError} />
      </nav>
      <main>
        {error ? (
          <ErrorPage error={error} />
        ) : (
          <Routes>
            <Route path="" element={<Home setError={setError} />} />
            <Route
              path="/articles/:article_id"
              element={<ArticlePage setError={setError} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </main>
    </UserContext.Provider>
  );
}

export default App;
