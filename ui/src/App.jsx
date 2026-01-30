import { useEffect, useState } from "react";
import { fetchEvents } from "./api";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const data = await fetchEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
    const interval = setInterval(loadEvents, 15000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the GitHub Activity Feed</h1>
      <h2>GitHub Activity Feed</h2>
      {events.map((e) => (
        <p key={e._id}>
          {e.type === "push" && (
            <>
              <b>{e.author}</b> pushed to <b>{e.to_branch}</b> on{" "}
              {new Date(e.timestamp).toUTCString()}
            </>
          )}

          {e.type === "pull_request" && (
            <>
              <b>{e.author}</b> submitted PR from <b>{e.from_branch}</b> to{" "}
              <b>{e.to_branch}</b> on {new Date(e.timestamp).toUTCString()}
            </>
          )}

          {e.type === "merge" && (
            <>
              <b>{e.author}</b> merged <b>{e.from_branch}</b> →{" "}
              <b>{e.to_branch}</b> on {new Date(e.timestamp).toUTCString()}
            </>
          )}
        </p>
      ))}
    </div>
  );
}

export default App;
