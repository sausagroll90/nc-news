import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../modules/api-requests";
import ArticleCard from "./ArticleCard";
import { APIError } from "../modules/errors";

export default function ArticleList({ setError }) {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchArticles() {
      const httpQueryParams = searchParams
        .entries()
        .reduce((params, [key, value]) => {
          params[key] = value;
          return params;
        }, {});

      try {
        const { articles } = await getArticles(httpQueryParams);
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
