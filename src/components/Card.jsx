import { MdPlayArrow } from "react-icons/md";
import { usePlayer } from "../context/usePlayer";
import "./Card.css";

export default function Card({ item }) {
  const { togglePlay, currentTrack, isPlaying } = usePlayer();
  const isActive = currentTrack?.id === item.id && isPlaying;

  return (
    <div className="card">
      <div className="card__image-wrap">
        <img
          src={item.image}
          alt={item.title}
          className="card__image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/160x160/282828/1DB954?text=${encodeURIComponent(item.title[0])}`;
          }}
        />
        <button
          className={`card__play-btn${isActive ? " card__play-btn--visible" : ""}`}
          onClick={() => togglePlay(item)}
          aria-label={isActive ? "Pause" : "Play"}
        >
          <MdPlayArrow size={28} />
        </button>
      </div>
      <div className="card__info">
        <p className="card__title">{item.title}</p>
        {item.description && (
          <p className="card__desc">{item.description}</p>
        )}
        {item.type && (
          <p className="card__desc">{item.type}</p>
        )}
      </div>
    </div>
  );
}
