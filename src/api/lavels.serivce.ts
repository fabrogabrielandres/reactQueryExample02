import axios from "axios";

export const GithubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        Authorization: "Bearer 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"
    }
})

