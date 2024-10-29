import { makeAutoObservable } from 'mobx';
import { Movie } from '../types/Movie';

class FavoriteStore {
  favorites: Movie[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFavorite(movie: Movie) {
    if (!this.favorites.find(fav => fav.imdbID === movie.imdbID)) {
      this.favorites.push(movie);
    }
  }

  removeFavorite(id: string) {
    this.favorites = this.favorites.filter(movie => movie.imdbID !== id);
  }
}

export default new FavoriteStore();
