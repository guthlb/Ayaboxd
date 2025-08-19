import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return <div className="relative rounded-lg overflow-hidden bg-gray-800 transition-transform duration-200
    hover:-translate-y-1 max-h-[380px] flex flex-col text-sm md:text-base">
        <div className="relative aspect-[2/3] w-full">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">

                <button
  onClick={onFavoriteClick}
  className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full
              transition-colors duration-200
              bg-black/50 hover:bg-black/80
              ${favorite ? "text-[#ff4757]" : "text-white"}`}
>
  ♥
</button>


            </div>
        </div>
        <div className="flex-1 flex flex-col  p-4 pt-2">
            <h3 className="text-white font-semibold">{movie.title}</h3>
            <p className="text-white text-sm font-medium italic ">{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard


