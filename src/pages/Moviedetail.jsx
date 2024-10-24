import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMovie } from "../features/movies/moviesSlice";
import Header from "../components/Header";

const MovieDetail = () => {
  // renamed component
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();

  const movieData = movies.find((movie) => movie._id === movieId);

  const deleteHandler = () => {
    dispatch(deleteMovie(movieId))
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.error("failed to delete movie");
      });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!movieData) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="container p-3">
        {status === "loading && <p>Loading...</p>"}
        <h1>Movie Detail</h1>
        <p>Movie Title: {movieData.title}</p>
        <p>Director: {movieData.director}</p>
        <p>Genre: {movieData.genre}</p>
        <div>
          <Link
            to={`/editMovie/${movieData._id}`}
            state={{ movie: movieData }}
            className=" bg-warning p-3 rounded "
          >
            Edit Details
          </Link>
          <span className="ms-2 ">
            {" "}
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
