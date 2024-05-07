export default function CommentCard({ comment, date }) {
  return (
    <article className="comment-card">
      <p>{comment.body}</p>
      <p>{comment.author}</p>
      <p>{date}</p>
      <p>Votes: {comment.votes}</p>
    </article>
  );
}
