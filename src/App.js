import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
const API_KEY = 'b9d96c1c';
const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'your_omdb_api_key'; // Replace with your OMDb API key

  const searchMovies = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=b9d96c1c`);

      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Error fetching movie data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-8">
      <h1 className="text-5xl text-center font-bold text-white mb-8">Movie Search App</h1>
      
      <form onSubmit={searchMovies} className="max-w-lg mx-auto mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full px-6 py-3 rounded-full mb-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 text-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-white text-center text-2xl">Loading...</p>}
      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default App;
