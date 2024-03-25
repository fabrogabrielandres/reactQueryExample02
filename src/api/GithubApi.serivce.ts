import axios from "axios";

export const GithubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        Authorization: "Bearer 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"
    }
})

