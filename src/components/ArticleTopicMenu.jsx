import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getTopics } from "../modules/api-requests";

export default function ArticleTopicMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topics, setTopics] = useState([]);
  const [chosenTopic, setChosenTopic] = useState("all topics");

  function handleTopicChange(event) {
    setChosenTopic(event.target.value);

    const newSearchParams = new URLSearchParams(searchParams);
    if (event.target.value === "all topics") {
      newSearchParams.delete("topic");
    } else {
      newSearchParams.set("topic", event.target.value);
    }
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    if (searchParams.get("topic")) {
      setChosenTopic(searchParams.get("topic"));
    }

    async function fetchTopics() {
      const data = await getTopics();
      setTopics(data.topics);
    }
    fetchTopics();
  }, []);

  return (
    <select
      aria-label="topic"
      className="filter-menu"
      onChange={handleTopicChange}
      value={chosenTopic}
    >
      <option value="all topics">all topics</option>
      {topics.map((topic) => (
        <option key={topic.slug} value={topic.slug}>
          {topic.slug}
        </option>
      ))}
    </select>
  );
}
