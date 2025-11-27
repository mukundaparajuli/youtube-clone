import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/chatSlice";
import generateRandomString from "../utils/textGenerator";
import generateRandomName from "../utils/nameGenerator";
export const LiveChat = () => {
  const chatMessages = useSelector((store) => store.chat.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          text: generateRandomString(30),
        })
      );
    }, 500);
    return () => {
      clearInterval(i);
    };
  });
  return (
    <div className=" flex flex-col-reverse">
      {chatMessages.map((c, i) => (
        <ChatMessage key={i} name={c.name} message={c.text} />
      ))}
    </div>
  );
};
export default LiveChat;
