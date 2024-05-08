import ArticleList from "./ArticleList";
import ArticleSortByMenu from "./ArticleSortByMenu";
import ArticleTopicMenu from "./ArticleTopicMenu";

export default function Home() {
  return (
    <>
      <ArticleTopicMenu />
      <ArticleSortByMenu />
      <ArticleList />
    </>
  );
}
