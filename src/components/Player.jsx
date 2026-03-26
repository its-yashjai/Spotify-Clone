import {
  MdPlayArrow,
  MdPause,
  MdSkipPrevious,
  MdSkipNext,
  MdShuffle,
  MdRepeat,
  MdRepeatOne,
  MdFavorite,
  MdFavoriteBorder,
  MdVolumeUp,
  MdVolumeOff,
  MdVolumeMute,
  MdOpenInFull,
  MdDevices,
  MdQueueMusic,
} from "react-icons/md";
import { usePlayer } from "../context/usePlayer";
import "./Player.css";

function ProgressBar({ value, onChange }) {
  return (
    <div className="progress-bar">
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="progress-bar__input"
        style={{ "--progress": `${value}%` }}
      />
    </div>
  );
}

function VolumeIcon({ volume, muted }) {
  if (muted || volume === 0) return <MdVolumeOff size={20} />;
  if (volume < 40) return <MdVolumeMute size={20} />;
  return <MdVolumeUp size={20} />;
}

function formatTime(progress) {
  // Fake a ~3:30 song duration for demo
  const totalSecs = 210;
  const currentSecs = Math.floor((progress / 100) * totalSecs);
  const mins = Math.floor(currentSecs / 60);
  const secs = currentSecs % 60;
  const totalMins = Math.floor(totalSecs / 60);
  const totalSecsRem = totalSecs % 60;
  return {
    current: `${mins}:${secs.toString().padStart(2, "0")}`,
    total: `${totalMins}:${totalSecsRem.toString().padStart(2, "0")}`,
  };
}

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isLiked,
    togglePlay,
    skipNext,
    skipPrev,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    toggleMute,
  } = usePlayer();

  const time = formatTime(progress);

  return (
    <footer className="player">
      {/* Left: track info */}
      <div className="player__track">
        {currentTrack && (
          <>
            <div className="player__album-art-wrap">
              <img
                src={currentTrack.image}
                alt={currentTrack.title}
                className="player__album-art"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/56x56/282828/1DB954?text=♪`;
                }}
              />
            </div>
            <div className="player__track-info">
              <span className="player__track-title">{currentTrack.title}</span>
              <span className="player__track-artist">{currentTrack.artist}</span>
            </div>
            <button
              className={`player__like-btn${isLiked ? " player__like-btn--active" : ""}`}
              onClick={toggleLike}
              aria-label={isLiked ? "Remove from liked songs" : "Save to liked songs"}
            >
              {isLiked ? <MdFavorite size={18} /> : <MdFavoriteBorder size={18} />}
            </button>
          </>
        )}
      </div>

      {/* Center: controls */}
      <div className="player__controls">
        <div className="player__buttons">
          <button
            className={`player__ctrl-btn${isShuffle ? " player__ctrl-btn--active" : ""}`}
            onClick={toggleShuffle}
            aria-label="Shuffle"
          >
            <MdShuffle size={20} />
          </button>
          <button className="player__ctrl-btn" onClick={skipPrev} aria-label="Previous">
            <MdSkipPrevious size={24} />
          </button>
          <button
            className="player__play-btn"
            onClick={() => togglePlay()}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
          </button>
          <button className="player__ctrl-btn" onClick={skipNext} aria-label="Next">
            <MdSkipNext size={24} />
          </button>
          <button
            className={`player__ctrl-btn${repeatMode > 0 ? " player__ctrl-btn--active" : ""}`}
            onClick={toggleRepeat}
            aria-label="Repeat"
          >
            {repeatMode === 2 ? <MdRepeatOne size={20} /> : <MdRepeat size={20} />}
          </button>
        </div>
        <div className="player__progress">
          <span className="player__time">{time.current}</span>
          <ProgressBar value={progress} onChange={seek} />
          <span className="player__time">{time.total}</span>
        </div>
      </div>

      {/* Right: extra controls */}
      <div className="player__extras">
        <button className="player__extra-btn" aria-label="Queue">
          <MdQueueMusic size={20} />
        </button>
        <button className="player__extra-btn" aria-label="Devices">
          <MdDevices size={20} />
        </button>
        <button
          className="player__extra-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <VolumeIcon volume={volume} muted={isMuted} />
        </button>
        <div className="player__volume">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseInt(e.target.value, 10));
              if (parseInt(e.target.value, 10) > 0 && isMuted) toggleMute();
            }}
            className="player__volume-input"
            style={{ "--volume": `${isMuted ? 0 : volume}%` }}
            aria-label="Volume"
          />
        </div>
        <button className="player__extra-btn" aria-label="Full screen">
          <MdOpenInFull size={18} />
        </button>
      </div>
    </footer>
  );
}
