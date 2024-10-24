import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import MovieView from "./components/MovieView.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <MovieView />
      </div>
    </>
  );
}

export default App;
