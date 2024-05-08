import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../modules/api-requests";

export default function AddComment({ setComments }) {
  const [input, setInput] = useState("");
  const [user] = useState("weegembump");
  const { article_id } = useParams();

  async function handleSubmit(event) {
    event.preventDefault();
    setInput("");
    const { comment } = await postComment(article_id, user, input);
    setComments((comments) => [comment, ...comments]);
  }

  return (
    <form>
      <label htmlFor="comment-input">Write a comment:</label>
      <input
        type="textarea"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <button onClick={(event) => handleSubmit(event)} disabled={!input}>
        Comment
      </button>
    </form>
  );
}
