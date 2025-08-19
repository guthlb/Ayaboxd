import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import Footer from "../components/Footer";

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
      setError(null);} 
      catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="/gif.gif"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-white text-6xl md:text-8xl font-bold mb-6">
            discover <br></br> 
<h4 className="text-white text-4xl font-normal">
  your next fav movie...
</h4> 
          </h1>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search for movies..."
              className="text-white border border-white rounded-l px-4 py-2 w-64 md:w-96 focus:outline-none focus:ring-2 focus:ring-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-r font-medium hover:bg-gray-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="p-6 bg-white min-h-screen">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : movies.length > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center p-8 pb-2">
              A Collection of most Popular Movies just for You
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold mb-2">No Movies Found</h2>
            <p className="text-gray-500">Try searching for a different movie.</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
