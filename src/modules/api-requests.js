import axios, { AxiosError } from "axios";
import { APIError } from "./errors";

export async function getArticles(params) {
    try {
        const response = await axios.get(
            "https://nc-news-yjss.onrender.com/api/articles",
            { params }
        );
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new APIError(e.response.data.msg, e.response.status);
        } else {
            throw e;
        }
    }
}

export async function getArticleById(id) {
    try {
        const response = await axios.get(
            `https://nc-news-yjss.onrender.com/api/articles/${id}`
        );
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new APIError(e.response.data.msg, e.response.status);
        } else {
            throw e;
        }
    }
}

export async function getCommentsByArticleId(id) {
    try {
        const response = await axios.get(
            `https://nc-news-yjss.onrender.com/api/articles/${id}/comments`
        );
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new APIError(e.response.data.msg, e.response.status);
        } else {
            throw r;
        }
    }
}

export async function updateArticleVotes(id, amount) {
    try {
        const response = await axios.patch(
            `https://nc-news-yjss.onrender.com/api/articles/${id}`,
            { inc_votes: amount }
        );
        return response.data;
    } catch (e) {
        if (!(e instanceof AxiosError)) {
            throw e;
        }
        if (e.code !== "ERR_NETWORK") {
            throw e;
        }
        throw new APIError("offline", "offline");
    }
}

export async function postComment(article_id, username, body) {
    try {
        const response = await axios.post(
            `https://nc-news-yjss.onrender.com/api/articles/${article_id}/comments`,
            { username: username, body: body }
        );
        return response.data;
    } catch (e) {
        if (!(e instanceof AxiosError)) {
            throw e;
        }
        if (e.code !== "ERR_NETWORK") {
            throw e;
        }
        throw new APIError("offline", "offline");
    }
}

export async function deleteComment(id) {
    await axios.delete(`https://nc-news-yjss.onrender.com/api/comments/${id}`);
}

export async function getTopics() {
    const response = await axios.get(
        "https://nc-news-yjss.onrender.com/api/topics"
    );
    return response.data;
}
