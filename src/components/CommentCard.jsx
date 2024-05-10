import { useContext, useState } from "react";
import { UserContext } from "../contexts/contexts";
import { deleteComment } from "../modules/api-requests";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../modules/utils";

export default function CommentCard({ comment, fetchComments }) {
  const { user } = useContext(UserContext);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(false);

  const date = getDateFromTimestamp(comment.created_at);
  const time = getTimeFromTimestamp(comment.created_at);

  async function handleClick() {
    setIsDeleteButtonDisabled(true);
    await deleteComment(comment.comment_id);
    fetchComments();
  }

  return (
    <article className="comment-card">
      <div className="comment-author-date-wrapper">
        <p>{comment.author}</p>
        <span className="comment-date-time-wrapper">
          <p>{time}</p>
          <p>{date}</p>
        </span>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="comment-votes-delete-wrapper">
        <p>Votes: {comment.votes}</p>
        {comment.author === user ? (
          <button
            className="button"
            onClick={handleClick}
            disabled={isDeleteButtonDisabled}
          >
            Delete
          </button>
        ) : null}
      </div>
    </article>
  );
}
