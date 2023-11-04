import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/AppSlice";
import { useSearchParams } from "react-router-dom";
import CommentContainer from "./Comment";
import LiveChat from "./LiveChat";
import { addMessage } from "../utils/chatSlice";
import VideoSuggestion from "./VideoSuggestion";
import DescriptionBox from "./DescriptionBox";
import { YOUTUBE_VIDEOS_APIS } from "../utils/Config";

const WatchVideo = () => {
  const [searchParams] = useSearchParams();
  const [liveMessage, setLiveMessage] = useState("");
  const [videos, setVideos] = useState("");
  const [videoIndex, setVideoIndex] = useState();
  console.log(searchParams.get("v"));
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_APIS);
    const json = await data.json();
    setVideos(json.items);
    const selectedIndex = json.items.findIndex(
      (video) => video.id === searchParams.get("v")
    );
    setVideoIndex(selectedIndex);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
    getVideos();
  }, []);

  return (
    <div>
      <div className="flex">
        <div>
          <div className="m-6 p-4">
            <iframe
              className="border-2 border-gray-500 rounded-lg bg-gray-300"
              width="1000"
              height="552"
              src={"https://www.youtube.com/embed/" + searchParams.get("v")}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <DescriptionBox info={videos[videoIndex]} />
            <CommentContainer />
          </div>
        </div>
        <div>
          <div className="border border-gray-300 my-9 bg-slate-300">
            <div className="mb-0  mx-2 w-full  h-[552px] rounded-lg bg-slate-200 overflow-y-scroll">
              <LiveChat />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  addMessage({
                    name: "Mukunda",
                    text: liveMessage,
                  })
                );
                console.log("onsubmit" + liveMessage);
              }}
            >
              <input
                type="text"
                className="w-5/6 cursor-text p-1 m-1"
                value={liveMessage}
                onChange={(e) => {
                  setLiveMessage(e.target.value);
                }}
              />
              <button className="bg-green-400 m-2 p-1 rounded-sm">Send</button>
            </form>
          </div>
          <div>
            <VideoSuggestion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
