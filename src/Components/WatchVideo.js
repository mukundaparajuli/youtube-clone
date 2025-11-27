import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../store/AppSlice";
import { useSearchParams } from "react-router-dom";
import CommentContainer from "./Comment";
import LiveChat from "./LiveChat";
import { addMessage } from "../store/chatSlice";
import { YOUTUBE_VIDEO_BY_ID_API } from "../config/Config";
import VideoSuggestion from "../Components/VideoSuggestion";
import DescriptionBox from "./DescriptionBox";

const WatchVideo = () => {
  const [searchParams] = useSearchParams();
  const [liveMessage, setLiveMessage] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());

    const getVideoData = async () => {
      try {
        const videoResponse = await fetch(`${YOUTUBE_VIDEO_BY_ID_API}&id=${videoId}`);
        const videoData = await videoResponse.json();
        if (videoData.items && videoData.items.length > 0) {
          setCurrentVideo(videoData.items[0]);
        }

      } catch (err) {
        setCurrentVideo(null);
      }
    };

    if (videoId) {
      getVideoData();
    }
  }, [dispatch, videoId]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2">
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
                src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0"}
                title={currentVideo?.snippet?.title || "YouTube video player"}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mt-4">
            <DescriptionBox info={currentVideo} />
            <CommentContainer videoId={videoId} />
          </div>
        </main>

        <aside className="lg:col-span-1 flex flex-col">
          <div className="flex items-center justify-between mb-2 lg:hidden">
            <h3 className="font-semibold">Live Chat</h3>
            <button
              onClick={() => setChatOpen((s) => !s)}
              className="text-sm px-3 py-1 bg-gray-200 rounded"
              aria-expanded={chatOpen}
            >
              {chatOpen ? "Hide" : "Show"}
            </button>
          </div>

          <div
            className={`mb-4 w-full border rounded-lg bg-slate-100 no-scrollbar overflow-y-auto overflow-x-hidden ${chatOpen ? "block" : "hidden"} lg:block max-h-[60vh]`}
            aria-live="polite"
          >
            <LiveChat />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!liveMessage) return;
              dispatch(
                addMessage({
                  name: "Mukunda",
                  text: liveMessage,
                })
              );
              setLiveMessage("");
            }}
            className="border px-2 border-gray-300 rounded-lg w-full flex  py-2"
          >
            <input
              type="text"
              placeholder="Send a message"
              className="flex-1 border border-transparent focus:border-gray-400 p-2 rounded"
              value={liveMessage}
              onChange={(e) => setLiveMessage(e.target.value)}
            />
            <button className="bg-green-500 text-white ml-1 px-4 py-1 rounded">Send</button>
          </form>

          <div className="mt-4 flex-1 overflow-y-auto">
            <h3 className="font-semibold mb-2">Up next</h3>
            <div className="space-y-2">
              <VideoSuggestion />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default WatchVideo;
