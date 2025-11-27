import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/AppSlice";
import { YOUTUBE_SUGESSTION_API } from "../config/Config";
import { cacheResults } from "./searchSlice";
import { FaBars, FaYoutube } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery) {
        setSuggestions([]);
        return;
      }

      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
        return;
      }

      try {
        const callbackName = 'youtubeSuggestionsCallback' + Date.now();
        window[callbackName] = (data) => {
          const sugg = Array.isArray(data) && data[1] ? data[1] : [];
          setSuggestions(sugg);
          dispatch(cacheResults({ [searchQuery]: sugg }));
          delete window[callbackName];
        };

        const script = document.createElement('script');
        script.src = YOUTUBE_SUGESSTION_API + encodeURIComponent(searchQuery) + '&callback=' + callbackName;
        script.onerror = () => {
          setSuggestions([]);
          delete window[callbackName];
        };
        document.head.appendChild(script);

        setTimeout(() => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
            delete window[callbackName];
          }
        }, 5000);
      } catch (err) {
        setSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, searchCache, dispatch]);

  return (
    <div className="flex justify-between h-16 bg-white w-screen  items-center px-4">
      <div className="flex items-center">
        <FaBars className="h-5 w-5 cursor-pointer ml-4" onClick={() => toggleMenuHandler()} />
        <a href="/">
          <FaYoutube className="h-8 w-20 text-red-600 mr-6" />
        </a>
      </div>
      <div className="flex-1 px-4 relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }
          }}
          className="flex h-14 justify-center w-[100%]"
          role="search"
          aria-label="Site search"
        >
          <div className="relative flex">
            <input
              type="text"
              name="q"
              placeholder="Search"
              aria-label="Search"
              className="w-4/5 md:w-3/5 border-solid border-gray-500 border-2 border-r-0 flex self-center rounded-l-full h-10 p-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
              onKeyDown={(e) => {
                if (!showSuggestion) return;
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setSelectedIndex((prev) => (prev + 1) % suggestions.length);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                } else if (e.key === 'Enter' && selectedIndex >= 0) {
                  setSearchQuery(suggestions[selectedIndex]);
                  setShowSuggestion(false);
                  setSelectedIndex(-1);
                } else if (e.key === 'Escape') {
                  setShowSuggestion(false);
                  setSelectedIndex(-1);
                }
              }}
            />
            <button
              type="submit"
              aria-label="Search button"
              className="border-solid border-gray-500 border-2 self-center  rounded-r-full h-10 p-1  bg-gray-300 w-16 flex items-center justify-center"
            >
              <Search className="h-6 w-6" />
            </button>
            {showSuggestion && (
              <div
                className="absolute top-full left-0 mt-1 w-[140%] md:w-[80%] bg-white h-auto border-2 border-gray-500 rounded-xl shadow-sm z-50"
                role="listbox"
                aria-label="Search suggestions"
              >
                <ul className="w-[100%]">
                  {suggestions.map((suggestion, index) => (
                    <li
                      className={`py-1 shadow-sm p-2 w-[100%] hover:bg-gray-200 cursor-pointer ${index === selectedIndex ? 'bg-gray-200' : ''}`}
                      key={suggestion}
                      role="option"
                      aria-selected={index === selectedIndex}
                      tabIndex={0}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestion(false);
                        setSelectedIndex(-1);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4 mr-4">
        <IoMdNotificationsOutline className="h-6 w-6 cursor-pointer hover:bg-gray-100 rounded-full" />
        <FaUserCircle className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
