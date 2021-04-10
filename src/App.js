import React, { useEffect, useState } from "react";
import Movie from "./components/Movie"

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=d8cbe211b13fb951fa19ef2fc180ecd7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=d8cbe211b13fb951fa19ef2fc180ecd7&query=";

function App() {
  const [movies ,setMovies ] = useState([]);
  const [searchTerm, setSearchTerm ] = useState('');
  

  useEffect(() => {
    getMovies(FEATURED_API)
  },[])

  const getMovies = (API) => {
    fetch(API)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setMovies(data.results)
    })
  }

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
      getMovies(SEARCH_API+searchTerm)
    setSearchTerm('');
    }

  }

  const handlerOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
    <header className="header">
      <form onSubmit={handlerOnSubmit}>
        <input className="search" type="text" placeholder="Search" value={searchTerm} onChange={handlerOnChange}/>
      </form>
    </header>
    <div className="movie-container">
       { movies && movies.length > 0 && movies.map(movie => (
      <Movie {...movie} key={movie.id} />
      ))}
    </div>
    </>
  );
}

export default App;