import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../modules/api-requests";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchArticles() {
      const httpQueryParams = {};
      for (const [key, value] of searchParams.entries()) {
        httpQueryParams[key] = value;
      }
      console.log(httpQueryParams);
      const { articles } = await getArticles(httpQueryParams);
      setArticles(articles);
    }
    fetchArticles();
  }, [searchParams]);

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
