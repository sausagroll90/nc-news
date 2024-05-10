import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, updateArticleVotes } from "../modules/api-requests";
import { getDateFromTimestamp } from "../modules/utils";
import { APIError } from "../modules/errors";
import LoadingSpinner from "./LoadingSpinner";

export default function Article({ setError }) {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const { article_id } = useParams();

  const date = article.created_at
    ? getDateFromTimestamp(article.created_at)
    : "";

  useEffect(() => {
    async function fetchArticle() {
      try {
        const { article } = await getArticleById(article_id);
        setIsLoading(false);
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

  async function handleUpvote() {
    setHasUpvoted(true);
    let VOTES_CHANGE;
    if (hasDownvoted) {
      setHasDownvoted(false);
      VOTES_CHANGE = 2;
    } else {
      VOTES_CHANGE = 1;
    }
    try {
      setArticle({ ...article, votes: article.votes + VOTES_CHANGE });
      const data = await updateArticleVotes(article.article_id, VOTES_CHANGE);
      setArticle({ ...article, votes: data.article.votes });
    } catch (e) {
      if (e instanceof APIError && e.status === "offline") {
        setHasUpvoted(false);
        setArticle({ ...article, votes: article.votes });
      } else {
        throw e;
      }
    }
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
    try {
      setArticle({ ...article, votes: article.votes + VOTES_CHANGE });
      const data = await updateArticleVotes(article.article_id, VOTES_CHANGE);
      setArticle({ ...article, votes: data.article.votes });
    } catch (e) {
      if (e instanceof APIError && e.status === "offline") {
        setHasDownvoted(false);
        setArticle({ ...article, votes: article.votes });
      } else {
        throw e;
      }
    }
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <article className="article">
      <img src={article.article_img_url} alt="" />
      <div className="topic-date-wrapper">
        <p>{article.topic}</p>
        <p>{date}</p>
      </div>
      <h2>{article.title}</h2>
      <p className="author">{article.author}</p>
      <p className="article-body">{article.body}</p>
      <div className="votes-comments-wrapper">
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
      <div className="vote-buttons-wrapper">
        <button
          className="button"
          onClick={() => handleUpvote()}
          disabled={hasUpvoted}
        >
          Vote Up
        </button>
        <button
          className="button"
          onClick={() => handleDownvote()}
          disabled={hasDownvoted}
        >
          Vote Down
        </button>
      </div>
    </article>
  );
}
