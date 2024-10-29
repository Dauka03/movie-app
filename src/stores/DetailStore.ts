import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { MovieDetail } from '../types/Movie';

class DetailStore {
  movie: MovieDetail | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovieDetails(id: string) {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=7e59b8de&i=${id}`);
    this.movie = response.data;
  }
}

export default new DetailStore();
