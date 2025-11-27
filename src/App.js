import "./App.css";
import "./index.css";
import Store from "./store/Store";
import { Provider } from "react-redux";
import Body from "./Components/Body";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WatchVideo from "./Components/WatchVideo";
import VideoContainer from "./Components/VideoContainer";
import SearchResults from "./Components/SearchResults";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <VideoContainer />,
        },
        {
          path: "/watch",
          element: <WatchVideo />,
        },
        {
          path: "/search",
          element: <SearchResults />,
        },
      ],
    },
  ]);
  return (
    <div className="overflow-hidden overflow-y-hidden h-[100vh]">
      <Provider store={Store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
