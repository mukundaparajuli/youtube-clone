const API_BASE_URL = "https://youtube.googleapis.com/youtube/v3";
const SUGGESTION_API_BASE = "https://suggestqueries.google.com/complete/search";

const getApiKey = () => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
        throw new Error("REACT_APP_YOUTUBE_API_KEY environment variable is required");
    }
    return apiKey;
};

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    API_KEY: getApiKey(),
    SUGGESTION_BASE: SUGGESTION_API_BASE,
};

export const API_ENDPOINTS = {
    VIDEOS: `${API_BASE_URL}/videos`,
    SEARCH: `${API_BASE_URL}/search`,
    COMMENT_THREADS: `${API_BASE_URL}/commentThreads`,
    SUGGESTIONS: `${SUGGESTION_API_BASE}?client=firefox&ds=yt&q=`,
};

export const API_PARAMS = {
    VIDEO_PARTS: "snippet,contentDetails,statistics",
    SEARCH_PARTS: "snippet",
    COMMENT_PARTS: "snippet,replies",
    MAX_RESULTS: {
        VIDEOS: 50,
        SEARCH: 25,
        COMMENTS: 20,
    },
    REGION_CODE: "NP",
    CHART: "mostPopular",
    TYPE: "video",
};

export const EMBED_CONFIG = {
    BASE_URL: "https://www.youtube.com/embed",
    PARAMS: {
        AUTOPLAY: "1",
        REL: "0",
    },
};