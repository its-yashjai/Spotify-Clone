import { useState } from "react";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdAdd,
  MdFavorite,
} from "react-icons/md";
import { sidebarPlaylists } from "../data/mockData";
import "./Sidebar.css";

export default function Sidebar({ activePage, onNavigate }) {
  const [activePlaylist, setActivePlaylist] = useState(null);

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <svg viewBox="0 0 78 24" xmlns="http://www.w3.org/2000/svg" className="sidebar__logo-svg">
          <path
            d="M18.616 10.639c-3.77-2.297-9.99-2.509-13.59-1.388a1.077 1.077 0 0 1-1.164-.490 1.07 1.07 0 0 1 .495-1.426c4.125-1.299 10.977-1.048 15.303 1.604a1.073 1.073 0 0 1 .351 1.48 1.079 1.079 0 0 1-1.395.22m-.124 3.402a.899.899 0 0 1-1.238.19c-3.147-1.932-7.94-2.492-11.662-1.364a.9.9 0 0 1-1.123-.598.898.898 0 0 1 .6-1.122c4.252-1.29 9.537-.665 13.148 1.556a.9.9 0 0 1 .275 1.338m-1.42 3.267a.72.72 0 0 1-.99.153c-2.747-1.676-6.204-2.054-10.276-1.127a.718.718 0 1 1-.322-1.399c4.455-1.02 8.277-.582 11.363 1.303a.717.717 0 0 1 .225.07M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0"
            fill="currentColor"
          />
          <text x="30" y="17" fill="currentColor" fontFamily="CircularSp,Helvetica,Arial,sans-serif" fontWeight="700" fontSize="16">
            Spotify
          </text>
        </svg>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          <li>
            <button
              className={`sidebar__nav-item${activePage === "home" ? " sidebar__nav-item--active" : ""}`}
              onClick={() => onNavigate("home")}
            >
              <MdHome size={26} />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              className={`sidebar__nav-item${activePage === "search" ? " sidebar__nav-item--active" : ""}`}
              onClick={() => onNavigate("search")}
            >
              <MdSearch size={26} />
              <span>Search</span>
            </button>
          </li>
          <li>
            <button
              className={`sidebar__nav-item${activePage === "library" ? " sidebar__nav-item--active" : ""}`}
              onClick={() => onNavigate("library")}
            >
              <MdLibraryMusic size={26} />
              <span>Your Library</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar__library">
        <div className="sidebar__library-header">
          <button className="sidebar__icon-btn" title="Create playlist">
            <MdAdd size={24} />
          </button>
          <button className="sidebar__icon-btn" title="Liked Songs">
            <MdFavorite size={24} />
          </button>
        </div>

        <div className="sidebar__create-playlist">
          <h3>Create your first playlist</h3>
          <p>It&apos;s easy, we&apos;ll help you</p>
          <button className="sidebar__create-btn">Create playlist</button>
        </div>

        <div className="sidebar__playlists">
          {sidebarPlaylists.map((name) => (
            <button
              key={name}
              className={`sidebar__playlist-item${activePlaylist === name ? " sidebar__playlist-item--active" : ""}`}
              onClick={() => setActivePlaylist(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__footer-links">
          <a href="#">Legal</a>
          <a href="#">Privacy Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
          <a href="#">About Ads</a>
          <a href="#">Accessibility</a>
        </div>
        <button className="sidebar__cookies-btn">Cookies</button>
      </div>
    </aside>
  );
}
