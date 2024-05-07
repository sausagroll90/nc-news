import axios from "axios";

export async function getArticles() {
    const response = await axios.get(
        "https://nc-news-yjss.onrender.com/api/articles"
    );
    return response.data;
}

export async function getArticleById(id) {
    const response = await axios.get(
        `https://nc-news-yjss.onrender.com/api/articles/${id}`
    );
    return response.data;
}

export async function getCommentsByArticleId(id) {
    const response = await axios.get(
        `https://nc-news-yjss.onrender.com/api/articles/${id}/comments`
    );
    return response.data;
}

export async function updateArticleVotes(id, amount) {
    const response = await axios.patch(
        `https://nc-news-yjss.onrender.com/api/articles/${id}`,
        { inc_votes: amount }
    );
    return response.data;
}
