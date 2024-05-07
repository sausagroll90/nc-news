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
    <Link to={"/articles/" + article_id}>
      <div className="article-card">
        <h2>{title}</h2>
        <p>{topic}</p>
        <p>{author}</p>
        <p>{date}</p>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
        <img src={article_img_url} alt="" />
      </div>
    </Link>
  );
}
