import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const {
    article_id,
    title,
    topic,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  const date = created_at.split("T")[0];

  return (
    <div className="article-card">
      <Link to={"/articles/" + article_id}>
        <h2>{title}</h2>
      </Link>
      <p>{topic}</p>
      <p>{author}</p>
      <p>{date}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      <img src={article_img_url} alt="" />
    </div>
  );
}
