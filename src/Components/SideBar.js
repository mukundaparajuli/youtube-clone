import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Home, Compass, History, CirclePlay, Clock, Music, Gamepad2, Trophy, User, Zap, Bell } from "lucide-react";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (isMenuOpen) {
    return (
      <div className="w-[300px] h-[100vh] shadow-lg text-gray-800 bg-white absolute left-0 top-0 z-10">
        {/* Main Navigation */}
        <div className="main p-2 border-b-[1px] border-gray-300">
          <div className="text-md">
            <Link to="/" className="w-full">
              <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg w-full">
                <Home className="w-6 h-6" />
                <span>Home</span>
              </div>
            </Link>

            <Link to="/shorts">
              <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg w-full p-2">
                <Zap className="w-6 h-6" />
                <span>Shorts</span>
              </div>
            </Link>

            <Link to="/subscriptions">
              <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
                <Bell className="w-6 h-6" />
                <span>Subscriptions</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Library Section */}
        <div className="main p-2 border-b-[1px] border-gray-300">
          <h1 className="text-md font-semibold mb-2">You</h1>
          <ul className="text-md">
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <CirclePlay className="w-6 h-6" />
              <span>Your Videos</span>
            </div>
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <History className="w-6 h-6" />
              <span>History</span>
            </div>
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Clock className="w-6 h-6" />
              <span>Watch Later</span>
            </div>
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <CirclePlay className="w-6 h-6" />
              <span>Your Clips</span>
            </div>
          </ul>
        </div>

        {/* Subscriptions */}
        <div className="main p-2 border-b-[1px] border-gray-300">
          <h1 className="text-md font-semibold mb-2">Subscriptions</h1>
          <ul className="text-md">
            <div className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer">
              <User className="w-6 h-6" />
              <span>Channel Name</span>
            </div>
            <div className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer">
              <User className="w-6 h-6" />
              <span>Channel Name</span>
            </div>
            <div className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer">
              <User className="w-6 h-6" />
              <span>Channel Name</span>
            </div>
            <div className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer">
              <User className="w-6 h-6" />
              <span>Channel Name</span>
            </div>
            <div className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer">
              <User className="w-6 h-6" />
              <span>Channel Name</span>
            </div>
            <div className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer">
              <User className="w-6 h-6" />
              <span>Channel Name</span>
            </div>
          </ul>
        </div>

        {/* Explore Section */}
        <div className="main p-2">
          <h1 className="text-md font-semibold mb-2">Explore</h1>
          <ul className="text-md">
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Compass className="w-6 h-6" />
              <span>Trending</span>
            </div>
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Music className="w-6 h-6" />
              <span>Music</span>
            </div>
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Gamepad2 className="w-6 h-6" />
              <span>Gaming</span>
            </div>
            <div className="p-2 flex items-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Trophy className="w-6 h-6" />
              <span>Sports</span>
            </div>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[70px] h-[100vh] shadow-lg text-gray-800 bg-white flex flex-col items-center py-4">
        <Link to="/" className="mb-4">
          <div className="p-2 hover:bg-gray-100 rounded-lg">
            <Home className="w-6 h-6" />
          </div>
        </Link>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <Zap className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <Bell className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <CirclePlay className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <History className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <Clock className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <Compass className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <Music className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <Gamepad2 className="w-6 h-6" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg mb-4">
          <Trophy className="w-6 h-6" />
        </div>
      </div>
    );
  }
};

export default SideBar;
