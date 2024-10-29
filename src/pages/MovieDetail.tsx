// MovieDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import detailStore from "../stores/DetailStore";
import favoriteStore from "../stores/FavoriteStore";
import { Button, Typography, Snackbar } from "@mui/material";
import { Movie } from "../types/Movie";

const MovieDetail: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (id) detailStore.fetchMovieDetails(id);

    const savedTime = localStorage.getItem(`videoTime_${id}`);
    if (savedTime) {
      setVideoTime(Number(savedTime));
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("youtube-player", {
        videoId: "nnHvWrbnnLs",
        playerVars: {
          autoplay: 0,
          controls: 1,
          start: videoTime,
        },
        events: {
          onReady: (event: any) => {
            event.target.seekTo(videoTime, true);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setInterval(() => {
                const currentTime = Math.floor(event.target.getCurrentTime());
                localStorage.setItem(`videoTime_${id}`, currentTime.toString());
              }, 1000);
            }
          },
        },
      });
      setPlayer(newPlayer);
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [id, videoTime]);

  const movie = detailStore.movie;

  const handleAddToFavorites = () => {
    favoriteStore.addFavorite(movie as Movie);
    setIsFavorite(true);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!movie) return null;

  return (
    <div>
      <Typography variant="h4">{movie.Title}</Typography>
      <Typography variant="subtitle1">Year: {movie.Year}</Typography>
      <Typography variant="subtitle1">Genre: {movie.Genre}</Typography>
      <Typography variant="body2">Plot: {movie.Plot}</Typography>
      <div id="youtube-player" style={{ marginTop: 20 }} />
      <br></br>
      <Button
        variant="contained"
        onClick={handleAddToFavorites}
        disabled={isFavorite}
        sx={{
          backgroundColor: isFavorite ? "green" : "primary.main",
          "&:hover": {
            backgroundColor: isFavorite ? "darkgreen" : "primary.dark",
          },
        }}
      >
        {isFavorite ? "Added to Favorites" : "Add to Favorites"}
      </Button>

      <Button
        component={Link}
        to="/favorites"
        variant="contained"
        color="secondary"
      >
        Go to Favorites
      </Button>
      <Button component={Link} to="/" variant="contained" color="secondary">
        Go to Home
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`${movie.Title} added to favorites!`}
      />
    </div>
  );
});

export default MovieDetail;
