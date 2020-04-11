import React from 'react';
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {
      data: {
        data : {movies}
      }} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading:false});
  }
  componentDidMount(){
    this.getMovies()
  }
  render(){
    const {isLoading, movies} = this.state;
    return (
    <section class="container">
      {isLoading 
      ? <div class="loader">
          <span class="loader_text">Loading...</span> 
        </div>
      : (
        <div class="movies">
          {        
          movies.map(movie => (
          <Movie
          key={movie.id}
          id={movie.id} 
          title={movie.title} 
          year={movie.year} 
          summary={movie.summary} 
          poster={movie.medium_cover_image}
          genres={movie.genres}
        />
      ))}
        </div>

      )}
    </section>
    );
  }

}

export default Home;
