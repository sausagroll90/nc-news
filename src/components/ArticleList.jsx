import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../modules/api-requests";
import { APIError } from "../modules/errors";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "./LoadingSpinner";

export default function ArticleList({ setError }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const { articles } = await getArticles(searchParams);
        setIsLoading(false);
        setArticles(articles);
      } catch (e) {
        if (e instanceof APIError) {
          setError(e);
        } else {
          throw e;
        }
      }
    }
    fetchArticles();
  }, [searchParams]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <ul>
      {articles.map((article) => (
        <li key={article.article_id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
