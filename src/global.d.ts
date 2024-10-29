declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: any; // You can define a more specific type if needed
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        // Add other player states as needed
      };
    };
  }
}

export {}; // Ensures the file is treated as a module
