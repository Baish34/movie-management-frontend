import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { addMovie, updateMovie } from "../features/movies/moviesSlice";

const MovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const movieToEdit = location.state?.movie || null;

  const [title, setTitle] = useState(movieToEdit ? movieToEdit.title : "");
  const [director, setDirector] = useState(
    movieToEdit ? movieToEdit.director : ""
  );
  const [genre, setGenre] = useState(movieToEdit ? movieToEdit.genre : "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (movieToEdit && Object.keys(movieToEdit).length > 0) {
      setTitle(movieToEdit.title || "");
      setDirector(movieToEdit.director || "");
      setGenre(movieToEdit.genre || "");
    }
  }, [movieToEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !director || !genre) {
      setError("All fields are required.");
      return;
    }

    const newMovie = {
      title: title,
      director: director,
      genre: genre,
    };

    if (movieToEdit) {
      console.log("Updating movie:", newMovie);
      dispatch(updateMovie({ ...movieToEdit, ...newMovie }));
    } else {
      dispatch(addMovie(newMovie));
    }

    setTitle(" ");
    setDirector(" ");
    setGenre(" ");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <h2>{movieToEdit ? "Edit Movie" : "Add Movie"}</h2>
        <form onSubmit={submitHandler}>
          <div>
            <input
              placeholder="Movie Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              placeholder="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <br />

          <button type="submit">
            {movieToEdit ? "Update Movie" : "Add Movie"}
          </button>
        </form>
      </div>
    </>
  );
};

export default MovieForm;
