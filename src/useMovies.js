import { useState, useEffect } from "react";

const KEY = "b76807dc";

function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      // callback function will be called if it exists
      // close movie on search
      //   callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        // loading is happening on mount
        try {
          setIsLoading(true);
          setError("");
          // get movie data on initial instance
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          // incase a user loses internet connection
          if (!res.ok)
            throw new Error("Something went wrong fetching movie data ");
          const data = await res.json();
          // if a movcie is not found in search
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          // set error here again for resetting error
          setError("");
        } catch (err) {
          // console.log(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      // cleanup function
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error }; // add a dependency array (only runs on first Mount)
}
export default useMovie;
