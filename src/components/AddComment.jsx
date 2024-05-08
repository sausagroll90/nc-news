import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../modules/api-requests";

export default function AddComment({ setComments }) {
  const [input, setInput] = useState("");
  const [isCommentButtonDisabled, setIsCommentButtonDisabled] = useState(false);
  const [user] = useState("weegembump");
  const { article_id } = useParams();

  async function handleSubmit(event) {
    event.preventDefault();
    setInput("");
    setIsCommentButtonDisabled(true);
    const { comment } = await postComment(article_id, user, input);
    setComments((comments) => [comment, ...comments]);
    setIsCommentButtonDisabled(false);
  }

  return (
    <form>
      <label htmlFor="comment-input">Write a comment:</label>
      <input
        type="textarea"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <button
        onClick={(event) => handleSubmit(event)}
        disabled={isCommentButtonDisabled}
      >
        Comment
      </button>
    </form>
  );
}
