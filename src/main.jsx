import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store";
import App from "./App.jsx";
import MovieForm from "./components/MovieForm";
import Moviedetail from "./pages/Moviedetail";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/movies/:movieId", element: <Moviedetail /> },
  { path: "/addMovie", element: <MovieForm /> },
  { path: "/editMovie/:movieId", element: <MovieForm /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
