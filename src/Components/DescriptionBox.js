import React, { useState } from "react";

const DescriptionBox = ({ info }) => {
  const [showMore, setShowMore] = useState(false);

  const { snippet, statistics } = info || {};
  const { title, channelTitle, localized, publishedAt } = snippet || {};
  const { viewCount, likeCount } = statistics || {};

  return (
    <div className="mt-4 p-4 bg-slate-300 border-b border-gray-300 w-full rounded-md">
      {/* Video Title */}
      <h1 className="font-semibold text-2xl mb-2">{title}</h1>

      {/* Channel Info, Views, Likes, Published Date */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div>
          <span className="font-semibold text-gray-800">{channelTitle}</span>
          <button className="ml-4 px-4 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
            Subscribe
          </button>
          <span className="ml-2">
            {viewCount && `${parseInt(viewCount).toLocaleString()} views`}
          </span>
        </div>
        <div>
          {likeCount && (
            <span className="mr-4">
              👍 {parseInt(likeCount).toLocaleString()} likes
            </span>
          )}
          <span>{publishedAt && new Date(publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Description with Show More/Less Toggle */}
      <div>
        <p className="text-gray-700 text-sm">
          {showMore
            ? localized?.description?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < localized.description.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))
            : localized?.description?.slice(0, 200)?.split('\n').map((line, index, arr) => (
              <React.Fragment key={index}>
                {line}
                {index < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          {localized?.description?.length > 200 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-1 text-blue-600 hover:underline"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
