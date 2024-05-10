import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIError } from "../modules/errors";
import { getArticleById } from "../modules/api-requests";
import Article from "./Article";
import CommentSection from "./CommentSection";
import LoadingSpinner from "./LoadingSpinner";

export default function ArticlePage({ setError }) {
  const [article, setArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    async function fetchArticle() {
      try {
        const { article } = await getArticleById(article_id);
        setIsArticleLoading(false);
        setArticle(article);
      } catch (e) {
        if (e instanceof APIError) {
          setError(e);
        } else {
          throw e;
        }
      }
    }
    fetchArticle();
  }, []);

  return (
    <>
      {isArticleLoading ? (
        <LoadingSpinner />
      ) : (
        <Article
          setError={setError}
          article={article}
          setArticle={setArticle}
        />
      )}
      <CommentSection commentCount={article.comment_count} />
    </>
  );
}
