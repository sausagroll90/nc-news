import { useState } from "react";
import { updateArticleVotes } from "../modules/api-requests";
import { APIError } from "../modules/errors";
import voteImg from "../assets/vote-border.svg";
import voteImgSolid from "../assets/vote-solid.svg";

export default function VoteButtons({ article_id, setArticle }) {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  async function handleUpvote() {
    if (!hasUpvoted) {
      setHasUpvoted(true);
      setHasDownvoted(false);
    } else {
      setHasUpvoted(false);
    }

    let votesChange;
    if (hasDownvoted) {
      votesChange = 2;
    } else if (hasUpvoted) {
      votesChange = -1;
    } else {
      votesChange = 1;
    }

    try {
      setArticle((article) => {
        return { ...article, votes: article.votes + votesChange };
      });
      const data = await updateArticleVotes(article_id, votesChange);
      setArticle((article) => {
        return { ...article, votes: data.article.votes };
      });
    } catch (e) {
      if (e instanceof APIError && e.status === "offline") {
        setHasUpvoted(false);
        setArticle((article) => {
          return { ...article, votes: article.votes };
        });
      } else {
        throw e;
      }
    }
  }

  async function handleDownvote() {
    if (!hasDownvoted) {
      setHasDownvoted(true);
      setHasUpvoted(false);
    } else {
      setHasDownvoted(false);
    }

    let votesChange;
    if (hasUpvoted) {
      setHasUpvoted(false);
      votesChange = -2;
    } else if (hasDownvoted) {
      votesChange = 1;
    } else {
      votesChange = -1;
    }

    try {
      setArticle((article) => {
        return { ...article, votes: article.votes + votesChange };
      });
      const data = await updateArticleVotes(article_id, votesChange);
      setArticle((article) => {
        return { ...article, votes: data.article.votes };
      });
    } catch (e) {
      if (e instanceof APIError && e.status === "offline") {
        setHasDownvoted(false);
        setArticle((article) => {
          return { ...article, votes: article.votes };
        });
      } else {
        throw e;
      }
    }
  }
  return (
    <div className="vote-buttons-wrapper">
      <button aria-label="upvote" className="button" onClick={handleUpvote}>
        <img
          className="upvote"
          src={hasUpvoted ? voteImgSolid : voteImg}
          alt="upvote"
        />
      </button>
      <button aria-label="downvote" className="button" onClick={handleDownvote}>
        <img
          className="downvote"
          src={hasDownvoted ? voteImgSolid : voteImg}
          alt="downvote"
        />
      </button>
    </div>
  );
}
