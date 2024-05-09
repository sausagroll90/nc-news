import { Link } from "react-router-dom";
import { getDateFromTimestamp } from "../modules/utils";

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

  const date = getDateFromTimestamp(created_at);

  return (
    <Link to={"/articles/" + article_id}>
      <div className="article-card">
        <div className="article-card-title">
          <h2>{title}</h2>
          <p>{author}</p>
        </div>
        <p className="article-card-topic">{topic}</p>
        <p className="article-card-date">{date}</p>
        <div className="article-card-votes-comments">
          <p>Votes: {votes}</p>
          <p>Comments: {comment_count}</p>
        </div>
        <img src={article_img_url} alt="" />
      </div>
    </Link>
  );
}
