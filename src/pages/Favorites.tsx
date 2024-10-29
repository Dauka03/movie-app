import React from "react";
import { observer } from "mobx-react-lite";
import favoriteStore from "../stores/FavoriteStore";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Favorites: React.FC = observer(() => {
  return (
    <Container>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>

      <Grid container spacing={2}>
        {favoriteStore.favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.Poster}
                  alt={movie.Title}
                />
                <CardContent>
                  <Typography variant="h6">{movie.Title}</Typography>
                  <Typography color="textSecondary">{movie.Year}</Typography>
                  <IconButton
                    onClick={() => favoriteStore.removeFavorite(movie.imdbID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
});

export default Favorites;
