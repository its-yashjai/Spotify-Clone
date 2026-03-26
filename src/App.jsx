import { useState } from "react";
import { PlayerProvider } from "./context/PlayerContext";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Player from "./components/Player";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <PlayerProvider>
      <div className="app">
        <div className="app__body">
          <Sidebar activePage={activePage} onNavigate={setActivePage} />
          <MainContent />
        </div>
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default App;
