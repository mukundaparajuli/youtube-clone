import React, { useEffect, useState } from "react";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { YOUTUBE_VIDEOS_APIS } from "../config/Config";
import { Link } from "react-router-dom";

const VideoSuggestion = () => {
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_APIS);
      const json = await data.json();
      setVideos(json.items);
    } catch (err) {
    }
  };

  useEffect(() => {
    getVideos();
  }, []);


  return (
    <div>
      {videos.map((video) => {
        const finalId =
          video.id?.videoId ||
          (typeof video.id === "string" ? video.id : video.id?.toString?.()) ||
          video.snippet?.resourceId?.videoId ||
          "";
        return (
          <Link to={"/watch?v=" + finalId} key={finalId}>
            <SuggestionVideoCard info={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoSuggestion;
