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

  const getFallbackSuggestions = (query) => {
    const commonSearches = [
      `${query} tutorial`,
      `${query} 2024`,
      `${query} explained`,
      `${query} vs`,
      `${query} tips`,
      `${query} guide`,
      `${query} review`,
      `${query} news`
    ];
    return commonSearches.slice(0, 5);
  };

  const buildSuggestionUrl = (query, callbackName) => {
    const params = new URLSearchParams({
      client: 'youtube',
      hl: 'en',
      ds: 'yt',
      q: query,
      callback: callbackName
    });
    return `${YOUTUBE_SUGESSTION_API}?${params.toString()}`;
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery || searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
        if (searchCache[searchQuery].length > 0) {
          setShowSuggestion(true);
        }
        return;
      }

      try {
        const callbackName = 'youtubeSuggestionsCallback' + Date.now();
        let timeoutId;

        const cleanup = () => {
          if (timeoutId) clearTimeout(timeoutId);
          if (window[callbackName]) delete window[callbackName];
          const script = document.querySelector(`script[src*="${callbackName}"]`);
          if (script && document.head.contains(script)) {
            document.head.removeChild(script);
          }
        };

        window[callbackName] = (data) => {
          cleanup();
          const sugg = Array.isArray(data) && data[1] ? data[1] : [];
          setSuggestions(sugg);
          if (sugg.length > 0) {
            setShowSuggestion(true);
          }
          dispatch(cacheResults({ [searchQuery]: sugg }));
        };

        const script = document.createElement('script');
        // FIXED: Use proper URL construction with parameters
        script.src = buildSuggestionUrl(searchQuery, callbackName);
        script.onerror = () => {
          cleanup();
          const fallbackSuggestions = getFallbackSuggestions(searchQuery);
          setSuggestions(fallbackSuggestions);
          if (fallbackSuggestions.length > 0) {
            setShowSuggestion(true);
          }
          dispatch(cacheResults({ [searchQuery]: fallbackSuggestions }));
        };

        document.head.appendChild(script);

        timeoutId = setTimeout(() => {
          cleanup();
          const fallbackSuggestions = getFallbackSuggestions(searchQuery);
          setSuggestions(fallbackSuggestions);
          if (fallbackSuggestions.length > 0) {
            setShowSuggestion(true);
          }
          dispatch(cacheResults({ [searchQuery]: fallbackSuggestions }));
        }, 3000);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        const fallbackSuggestions = getFallbackSuggestions(searchQuery);
        setSuggestions(fallbackSuggestions);
        if (fallbackSuggestions.length > 0) {
          setShowSuggestion(true);
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, searchCache, dispatch]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestion(false);
    setSelectedIndex(-1);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestion(false);
      setSelectedIndex(-1);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestion || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestion(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-between h-16 bg-white w-screen items-center px-4 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center">
        <FaBars
          className="h-5 w-5 cursor-pointer ml-4 hover:bg-gray-100 rounded-full p-1"
          onClick={toggleMenuHandler}
          aria-label="Toggle menu"
        />
        <a href="/" className="flex items-center">
          <FaYoutube className="h-8 w-20 text-red-600 mr-6" />
        </a>
      </div>

      <div className="flex-1 px-4 relative max-w-2xl">
        <form
          onSubmit={handleSearchSubmit}
          className="flex justify-center w-full"
          role="search"
          aria-label="Site search"
        >
          <div className="relative flex w-full max-w-xl">
            <input
              type="text"
              name="q"
              placeholder="Search"
              aria-label="Search YouTube"
              className="w-full border border-gray-300 border-r-0 flex self-center rounded-l-full h-10 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Search"
              className="border border-gray-300 border-l-0 self-center rounded-r-full h-10 px-6 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {showSuggestion && suggestions.length > 0 && (
              <div
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
                role="listbox"
                aria-label="Search suggestions"
              >
                <ul className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${index === selectedIndex ? 'bg-gray-100' : ''
                        } ${index === 0 ? 'rounded-t-lg' : ''} ${index === suggestions.length - 1 ? 'rounded-b-lg' : ''
                        }`}
                      key={suggestion + index}
                      role="option"
                      aria-selected={index === selectedIndex}
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4 mr-4">
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <IoMdNotificationsOutline className="h-6 w-6" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="User profile"
        >
          <FaUserCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;