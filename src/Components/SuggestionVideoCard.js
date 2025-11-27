import React from "react";
import { formatViews } from "../utils/formatViews";
import { timeSince } from "../utils/timeSince";

const SuggestionVideoCard = ({ info }) => {
  const title = info?.snippet?.title || "";
  const channel = info?.snippet?.channelTitle || "";
  const viewCount = info?.statistics?.viewCount ? Number(info.statistics.viewCount) : 0;
  const published = info?.snippet?.publishedAt || "";

  return (
    <div className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
      <img
        loading="lazy"
        className="rounded-sm h-[106px] w-[190px] object-cover"
        src={info?.snippet?.thumbnails?.medium?.url}
        alt={title || "Video thumbnail"}
      />
      <div className="flex-1">
        <h1 className="font-semibold text-sm leading-tight mb-1" title={title}>
          {title.length > 70 ? title.slice(0, 67) + "..." : title}
        </h1>
        <div className="flex items-center text-xs text-gray-600 space-x-2 mb-1">
          <img
            className="h-4 w-4 rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
            alt={channel || "Channel"}
          />
          <span className="font-medium">{channel.length > 30 ? channel.slice(0, 27) + "..." : channel}</span>
        </div>
        <div className="text-xs text-gray-500">
          <span>{viewCount ? formatViews(viewCount) : "-- views"}</span>
          {published && <span> • {timeSince(published.split("T")[0])}</span>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SuggestionVideoCard);
