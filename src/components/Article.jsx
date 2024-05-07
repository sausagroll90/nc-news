import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, updateArticleVotes } from "../modules/api-requests";
import { getDateFromTimestamp } from "../modules/utils";

export default function Article() {
  const [article, setArticle] = useState({});
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
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

  async function handleUpvote() {
    setHasUpvoted(true);
    let VOTES_CHANGE;
    if (hasDownvoted) {
      setHasDownvoted(false);
      VOTES_CHANGE = 2;
    } else {
      VOTES_CHANGE = 1;
    }
    setArticle({ ...article, votes: article.votes + VOTES_CHANGE });
    const data = await updateArticleVotes(article.article_id, VOTES_CHANGE);
    setArticle({ ...article, votes: data.article.votes });
  }

  async function handleDownvote() {
    setHasDownvoted(true);
    let VOTES_CHANGE;
    if (hasUpvoted) {
      setHasUpvoted(false);
      VOTES_CHANGE = -2;
    } else {
      VOTES_CHANGE = -1;
    }
    setArticle({ ...article, votes: article.votes + VOTES_CHANGE });
    const data = await updateArticleVotes(article.article_id, VOTES_CHANGE);
    setArticle({ ...article, votes: data.article.votes });
  }

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
      <button
        onClick={() => {
          handleUpvote();
        }}
        disabled={hasUpvoted}
      >
        Vote Up
      </button>
      <button
        onClick={() => {
          handleDownvote();
        }}
        disabled={hasDownvoted}
      >
        Vote Down
      </button>
    </article>
  );
}
