import { useSelector } from "react-redux";

import React from "react";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  return (
    <div className="container mt-3">
      <h2>Movie List</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="list-group">
        {movies?.map((movie) => (
          <li key={movie._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link
                  to={`/movies/${movie._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Title: {movie.title} <br />
                  Director: {movie.director}
                  <br />
                  Genre: {movie.genre}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
