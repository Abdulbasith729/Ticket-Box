import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const IMG_API = 'https://image.tmdb.org/t/p/w500/';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  params: {
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc',
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mjk2ZDBkMWRhMWUwMWM0ZWM2OGJkOWVkZjkyMjc0OCIsInN1YiI6IjY1YTRmMGEyOGEwZTliMDEyZWI0NWZiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Ny8iqJ8hOsaNwEPdvKSiNQq33qniqiCNrPq9yqNavQ'
      
  },
};

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error('Error fetching movies:', error);
      });
  }, []);

useEffect(()=>{
const user = localStorage.getItem('userEmail')
if(!user){
  navigate('/login')
}

},[])





  const handleClick = (movie) => {
    navigate(`/movie/${movie.id}`,{state: movie});
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: 30 }}>
      {movies.map((movie) => (
        <div key={movie.id}>
          <Card
            onClick={() => handleClick(movie.id)}
            style={{
              width: '20em',
              padding: 25,
              height: 'auto',
              overflow: 'hidden',
              margin: 10,
              cursor: 'pointer', // Add cursor pointer for better UX
            }}
          >
            <Card.Img
              src={IMG_API + movie.poster_path}
             
              width={100}
              style={{ padding: 10 }} // Adjust padding for the image
              alt={movie.title}
            />
            <Card.Title>{movie.title}</Card.Title>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Movie;
