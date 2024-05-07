import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../modules/api-requests";
import { getDateFromTimestamp } from "../modules/utils";

export default function Article() {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  const date = article.created_at
    ? getDateFromTimestamp(article.created_at)
    : "";

  useEffect(() => {
    async function fetchArticle() {
      const { article } = await getArticleById(article_id);
      setArticle(article);
    }
    fetchArticle();
  }, []);

  return (
    <article className="article">
      <img src={article.article_img_url} alt="" />
      <p>{article.topic}</p>
      <h2>{article.title}</h2>
      <p>{article.author}</p>
      <p>{date}</p>
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </article>
  );
}
