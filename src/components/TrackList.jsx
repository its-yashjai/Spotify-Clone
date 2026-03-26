import { useState } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import { usePlayer } from "../context/usePlayer";
import "./TrackList.css";

function ExplicitBadge() {
  return <span className="explicit-badge">E</span>;
}

export default function TrackList({ tracks }) {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="tracklist">
      <div className="tracklist__header">
        <span className="tracklist__col tracklist__col--num">#</span>
        <span className="tracklist__col tracklist__col--title">TITLE</span>
        <span className="tracklist__col tracklist__col--album">ALBUM</span>
        <span className="tracklist__col tracklist__col--duration">⏱</span>
      </div>
      <div className="tracklist__divider" />
      {tracks.map((track, index) => {
        const isActive = currentTrack?.id === track.id;
        const isCurrentlyPlaying = isActive && isPlaying;

        return (
          <div
            key={track.id}
            className={`tracklist__row${isActive ? " tracklist__row--active" : ""}`}
            onMouseEnter={() => setHoveredId(track.id)}
            onMouseLeave={() => setHoveredId(null)}
            onDoubleClick={() => togglePlay(track)}
          >
            <span className="tracklist__col tracklist__col--num">
              {hoveredId === track.id ? (
                <button
                  className="tracklist__play-btn"
                  onClick={() => togglePlay(track)}
                >
                  {isCurrentlyPlaying ? (
                    <MdPause size={18} />
                  ) : (
                    <MdPlayArrow size={18} />
                  )}
                </button>
              ) : isCurrentlyPlaying ? (
                <span className="tracklist__playing-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <rect x="0" y="4" width="3" height="10" rx="1" fill="#1DB954">
                      <animate attributeName="height" values="10;4;10" dur="0.8s" repeatCount="indefinite" />
                      <animate attributeName="y" values="4;8;4" dur="0.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="5" y="2" width="3" height="12" rx="1" fill="#1DB954">
                      <animate attributeName="height" values="12;4;12" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
                      <animate attributeName="y" values="2;8;2" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
                    </rect>
                    <rect x="10" y="5" width="3" height="9" rx="1" fill="#1DB954">
                      <animate attributeName="height" values="9;3;9" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
                      <animate attributeName="y" values="5;9;5" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
                    </rect>
                  </svg>
                </span>
              ) : (
                <span className={isActive ? "tracklist__num--active" : "tracklist__num"}>
                  {index + 1}
                </span>
              )}
            </span>

            <span className="tracklist__col tracklist__col--title">
              <img
                src={track.image}
                alt={track.title}
                className="tracklist__thumb"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/40x40/282828/1DB954?text=♪`;
                }}
              />
              <span className="tracklist__title-info">
                <span className={`tracklist__title${isActive ? " tracklist__title--active" : ""}`}>
                  {track.title}
                </span>
                <span className="tracklist__artist">
                  {track.explicit && <ExplicitBadge />}
                  {track.artist}
                </span>
              </span>
            </span>

            <span className="tracklist__col tracklist__col--album tracklist__album">
              {track.album}
            </span>

            <span className="tracklist__col tracklist__col--duration tracklist__duration">
              {track.duration}
            </span>
          </div>
        );
      })}
    </div>
  );
}
