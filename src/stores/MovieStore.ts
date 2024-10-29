import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Movie } from '../types/Movie';

class MovieStore {
  movies: Movie[] = [];
  query: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovies(query: string) {
    this.query = query;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=7e59b8de&s=${query}`);
    this.movies = response.data.Search || [];
  }
}

export default new MovieStore();
