export interface IBrightcovePlayer {
  play: () => void;
  pause: () => void;
  muted: (isMuted: boolean) => void;
}
