import { useEffect, useState } from "react";
import { getArticles } from "../modules/api-requests";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // TODO refactor to use async await
    getArticles().then((data) => {
      setArticles(data.articles);
    });
  }, []);

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.article_id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
