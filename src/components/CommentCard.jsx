import { useContext, useState } from "react";
import { UserContext } from "../contexts/contexts";
import { deleteComment } from "../modules/api-requests";

export default function CommentCard({ comment, date, fetchComments }) {
  const { user } = useContext(UserContext);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(false);

  async function handleClick() {
    setIsDeleteButtonDisabled(true);
    await deleteComment(comment.comment_id);
    fetchComments();
  }

  return (
    <article className="comment-card">
      <p>{comment.body}</p>
      <p>{comment.author}</p>
      <p>{date}</p>
      <p>Votes: {comment.votes}</p>
      {comment.author === user ? (
        <button onClick={() => handleClick()} disabled={isDeleteButtonDisabled}>
          Delete
        </button>
      ) : null}
    </article>
  );
}
