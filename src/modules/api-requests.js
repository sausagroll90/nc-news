import axios from "axios";

export function getArticles() {
    return axios
        .get("https://nc-news-yjss.onrender.com/api/articles")
        .then((response) => response.data)
        .catch((error) => Promise.reject(error));
}
