import ArticleList from "./ArticleList";
import ArticleSortByMenu from "./ArticleSortByMenu";
import ArticleTopicMenu from "./ArticleTopicMenu";

export default function Home({ setError }) {
  return (
    <>
      <div className="filter-wrapper">
        <ArticleTopicMenu />
        <ArticleSortByMenu />
      </div>
      <ArticleList setError={setError} />
    </>
  );
}
