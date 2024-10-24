import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchMovies } from "../features/movies/moviesSlice";
import MovieList from "./MovieList";

const MovieView = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  console.log(movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="container p-4">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h1 className="mb-3">Movie View</h1>
      <Link to="/addMovie" className="rounded px-3 py-2 bg-warning ">
        Add Movie
      </Link>
      <MovieList movies={movies.movies} />
    </div>
  );
};

export default MovieView;
