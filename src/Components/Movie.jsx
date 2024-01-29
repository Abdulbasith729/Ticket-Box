import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const IMG_API = 'https://image.tmdb.org/t/p/w500/';
const API_KEY = '5296d0d1da1e01c4ec68bd9edf922748';
const TIMINGS = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];

export default function Movie() {
  const location = useLocation();
  const movieId = location.state;
  const [LatLng, setLatLng] = useState({});
  const [movieDetails, setMovieDetails] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    // Fetch movie details using the movie ID
    if (movieId) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
          },
        })
        .then((response) => {
          setMovieDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    }
  }, [movieId]);

  useEffect(() => {
    // Fetch nearby theatres using Geoapify API
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(LatLng).length > 0) {
      const GeoAPI = `https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:${LatLng.lng},${LatLng.lat},5000&bias=proximity:78.44202,17.3707564&limit=8&apiKey=abd0845b0f974b87830439dc67896ca1`;

      axios.get(GeoAPI)
        .then((res) => {
          const featuresArr = res.data.features;
          const names = featuresArr.map((feature) => feature.properties.name);
          setTheatres(names);
        })
        .catch((error) => {
          console.error('Error fetching theatres:', error);
        });
    }
  }, [LatLng]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, poster_path } = movieDetails;

  return (
    <div>
      <Row>
        <Col>
          <div style={{ padding: 70 }}>
            <img style={{ borderRadius: 8, marginBottom: 24 }} src={IMG_API + poster_path} height={300} width={200} alt={title} />
            <h3>{title}</h3>
            <div>{overview}</div>
          </div>
        </Col>

        <Col style={{ padding: 70 }}>
          <div>
            {theatres.map((theatre, index) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <h5 style={{ marginBottom: 10 }}>{theatre}</h5>
                {TIMINGS.map((time, timeIndex) => (
                  <Button
                    onClick={() => {
                      // Use navigate for navigation
                      navigate('/select', { state: { title: title } });
                    }}
                    key={`${time}`}
                    style={{ marginRight: 10 }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
