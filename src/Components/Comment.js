import React, { useEffect, useState } from "react";
import { YOUTUBE_COMMENT_API } from "../config/Config";
import { comments as sampleComments } from "../config/CommentsConfig";

function Comment({ data }) {
  return (
    <div className="flex  rounded-lg bg-gray-100 m-4 shadow-md">
      <div className="w-12 h-12 flex items-start justify-center p-3">
        <img
          className=" rounded-full object-cover"
          src={data.authorProfileImageUrl || "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"}
          alt={data.authorDisplayName || "User"}
        />
      </div>
      <div className="px-3 flex-1">
        <p className="font-bold text-sm">{data.authorDisplayName || data.name}</p>
        <p className="text-justify text-sm mt-1" dangerouslySetInnerHTML={{ __html: data.textDisplay || data.text }} />
      </div>
    </div>
  );
}

const CommentList = ({ comments }) => (
  <div>
    {comments.map((comment, index) => (
      <div key={index}>
        <Comment data={comment} />
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 border-l-2">
            <CommentList comments={comment.replies} />
          </div>
        )}
      </div>
    ))}
  </div>
);

const CommentContainer = ({ videoId }) => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      if (!videoId) {
        setCommentsData(sampleComments);
        return;
      }

      try {
        const url = `${YOUTUBE_COMMENT_API}&videoId=${videoId}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json && json.items) {
          const parsed = json.items.map((item) => {
            const top = item.snippet.topLevelComment.snippet;
            const replies = (item.replies && item.replies.comments) ? item.replies.comments.map(r => ({
              authorDisplayName: r.snippet.authorDisplayName,
              authorProfileImageUrl: r.snippet.authorProfileImageUrl,
              textDisplay: r.snippet.textDisplay
            })) : [];
            return {
              authorDisplayName: top.authorDisplayName,
              authorProfileImageUrl: top.authorProfileImageUrl,
              textDisplay: top.textDisplay,
              replies,
            };
          });
          setCommentsData(parsed);
        } else {
          setCommentsData(sampleComments);
        }
      } catch (err) {
        setCommentsData(sampleComments);
      }
    };

    getComments();
  }, [videoId]);

  return (
    <div className="w-full m-2">
      <h1 className="font-bold text-2xl">Comments</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentContainer;
