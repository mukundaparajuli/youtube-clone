import React from "react";
import Buttons from "./Buttons";
const ButtonList = () => {
  const buttonLists = [
    "All",
    "Music",
    "Sitcoms",
    "Sports",
    "Thoughts",
    "Stoicism",
    "Movie",
    "Mixes",
    "Electronics",
    "Cricket",
    "Spirituality",
    "Comedy",
    "Investment",
    "React",
  ];
  return (
    <div className="flex overflow-auto no-scrollbar">
      {buttonLists.map((item) => (
        <Buttons name={item} key={item} />
      ))}
    </div>
  );
};

export default ButtonList;
