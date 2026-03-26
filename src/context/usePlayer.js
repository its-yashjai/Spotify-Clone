import { useContext } from "react";
import { PlayerContext } from "./playerContextObject";

export function usePlayer() {
  return useContext(PlayerContext);
}
