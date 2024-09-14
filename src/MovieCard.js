import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieCard = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'b9d96c1c'; // Replace with your OMDb API key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!movieDetails) {
    return <div className="text-center text-red-500">Movie details not available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <img
        src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/400'}
        alt={movieDetails.Title}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-bold text-gray-800 truncate">{movieDetails.Title}</h2>
      <p className="text-gray-600 mb-1"><strong>Year:</strong> {movieDetails.Year}</p>
      <p className="text-gray-600 mb-1"><strong>Genre:</strong> {movieDetails.Genre}</p>
      <p className="text-gray-600 mb-1"><strong>Director:</strong> {movieDetails.Director}</p>
      <p className="text-gray-600 mb-1"><strong>Actors:</strong> {movieDetails.Actors}</p>
      <p className="text-gray-600 mb-2 truncate"><strong>Plot:</strong> {movieDetails.Plot}</p>
      <p className="text-gray-600 mb-2"><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
      <a
        href={`https://www.imdb.com/title/${movie.imdbID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out"
      >
        View on IMDb
      </a>
    </div>
  );
};

export default MovieCard;
