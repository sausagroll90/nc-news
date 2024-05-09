import { useState } from "react";
import ArticleList from "./ArticleList";
import ArticleSortByMenu from "./ArticleSortByMenu";
import ArticleTopicMenu from "./ArticleTopicMenu";
import ErrorPage from "./ErrorPage";

export default function Home({ setError }) {
  return (
    <>
      <ArticleTopicMenu />
      <ArticleSortByMenu />
      <ArticleList setError={setError} />
    </>
  );
}
