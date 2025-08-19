import {useMovieContext} from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className=" p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center p-6">Your Favorites !!!</h2>
        <div className="movies-grid grid lg:grid-cols-6 gap-2 ">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty text-center py-10">
      <h2 className=" text-2xl font-semibold mb-2">No Favorite Movies Yet</h2>
      <p className="text-gray-500">
        Start adding movies to your favorites and they will appear here!
      </p>
    </div>
  );
}

export default Favorites;
