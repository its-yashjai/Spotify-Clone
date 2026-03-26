import { useState, useRef, useCallback } from "react";
import { chartTracks } from "../data/mockData";
import { PlayerContext } from "./playerContextObject";

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(chartTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0=off, 1=all, 2=one
  const [isLiked, setIsLiked] = useState(false);

  const intervalRef = useRef(null);

  const play = useCallback((track) => {
    if (track && track.id !== currentTrack?.id) {
      setCurrentTrack(track);
      setProgress(0);
    }
    setIsPlaying(true);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.1;
      });
    }, 200);
  }, [currentTrack]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  }, []);

  const togglePlay = useCallback((track) => {
    if (track && track.id !== currentTrack?.id) {
      play(track);
    } else if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [currentTrack, isPlaying, play, pause]);

  const skipNext = useCallback(() => {
    const idx = chartTracks.findIndex((t) => t.id === currentTrack?.id);
    const next = chartTracks[(idx + 1) % chartTracks.length];
    play(next);
  }, [currentTrack, play]);

  const skipPrev = useCallback(() => {
    if (progress > 5) {
      setProgress(0);
      return;
    }
    const idx = chartTracks.findIndex((t) => t.id === currentTrack?.id);
    const prev = chartTracks[(idx - 1 + chartTracks.length) % chartTracks.length];
    play(prev);
  }, [currentTrack, progress, play]);

  const seek = useCallback((value) => {
    setProgress(value);
  }, []);

  const toggleShuffle = useCallback(() => setIsShuffle((s) => !s), []);
  const toggleRepeat = useCallback(() => setRepeatMode((m) => (m + 1) % 3), []);
  const toggleLike = useCallback(() => setIsLiked((l) => !l), []);
  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  return (
    <PlayerContext.Provider
      value={{
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
