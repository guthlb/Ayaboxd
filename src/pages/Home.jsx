import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for movies..."
          className=" mt-10 border border-gray-600 rounded-l px-4 py-2 w-160 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className=" mt-10 bg-black text-white px-4 py-2 rounded-r tracking-wide font-medium"
        >
          Search
        </button>
      </form>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : movies.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center p-6">
            Explore Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-2">
            No Movies Found
          </h2>
          <p className="text-gray-500">
            Try searching for a different movie.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
