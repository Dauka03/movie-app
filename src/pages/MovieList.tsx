import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import movieStore from "../stores/MovieStore";
import {
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const MovieList: React.FC = observer(() => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    movieStore.fetchMovies(e.target.value);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movie Finder
          </Typography>
          <Button component={Link} to="/favorites" color="inherit">
            Go to Favorites
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <TextField
          label="Search Movies"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleSearch}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={2}>
          {movieStore.movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.Poster}
                    alt={movie.Title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {movie.Title}
                    </Typography>
                    <Typography color="textSecondary">{movie.Year}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
});

export default MovieList;
