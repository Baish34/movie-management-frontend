import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(
    "https://movie-management-seven.vercel.app/movies1"
  );
  return response.data;
});

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id) => {
    const response = await axios.get(
      `https://movie-management-seven.vercel.app/movies1/${id}`
    );
    return response.data;
  }
);

export const addMovie = createAsyncThunk("movies/addMovie", async (movie) => {
  const response = await axios.post(
    "https://movie-management-seven.vercel.app/movies1",
    movie
  );
  return response.data;
});

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, ...movie }) => {
    const response = await axios.put(
      `https://movie-management-seven.vercel.app/movies1/${id}`,
      movie
    );
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id) => {
    await axios.delete(
      `https://movie-management-seven.vercel.app/movies1/${id}`
    );
    return id;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        );
      });
  },
});

export default moviesSlice.reducer;
