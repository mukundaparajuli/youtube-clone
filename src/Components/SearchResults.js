import React, { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../config/Config";
import { SearchResultCard } from "./VideoCard";
import { Link, useSearchParams } from "react-router-dom";
import { SearchResultsShimmer } from "./Shimmer";

const SearchResults = () => {
    const [videos, setVideos] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    useEffect(() => {
        const getSearchResults = async () => {
            try {
                const data = await fetch(YOUTUBE_SEARCH_API + "&q=" + encodeURIComponent(query));
                const json = await data.json();
                setVideos(json.items || []);
            } catch (error) {
                setVideos([]);
            }
        };

        if (query) {
            getSearchResults();
        }
    }, [query]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {query && (
                <div className="mb-6">
                    <h1 className="text-2xl font-normal text-gray-800">
                        Search results for "<span className="font-medium">{query}</span>"
                    </h1>
                </div>
            )}
            {videos.length === 0 ? (
                <SearchResultsShimmer />
            ) : (
                <div className="space-y-3">
                    {videos.map((video) => (
                        <Link to={"/watch?v=" + video.id.videoId} key={video.id.videoId}>
                            <SearchResultCard key={video.id.videoId} info={video} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;