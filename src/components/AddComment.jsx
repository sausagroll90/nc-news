import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../modules/api-requests";
import { APIError } from "../modules/errors";
import { UserContext } from "../contexts/contexts";

export default function AddComment({ fetchComments, setCommentCount }) {
  const [input, setInput] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  async function handleSubmit(event) {
    event.preventDefault();
    setInput("");
    try {
      const { comment } = await postComment(article_id, user, input);
      setCommentCount((commentCount) => commentCount + 1);
      setIsOffline(false);
      fetchComments();
    } catch (e) {
      if (e instanceof APIError && e.status === "offline") {
        setIsOffline(true);
      }
    }
  }

  return (
    <form>
      <label htmlFor="comment-input">Write a comment:</label>
      <textarea
        id="comment-input"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      {isOffline ? (
        <p>
          <span className="error-text">Offline</span>
        </p>
      ) : (
        ""
      )}
      <div className="comment-button-wrapper">
        <button
          id="comment-button"
          className="button"
          onClick={handleSubmit}
          disabled={!input}
        >
          Comment
        </button>
      </div>
    </form>
  );
}
