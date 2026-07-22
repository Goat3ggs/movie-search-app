export async function searchMovies(movieName) {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";
  const params = new URLSearchParams({
    query: movieName,
    include_adult: false,
    page: 1,
  });
  const url = baseUrl + "?" + params.toString();

  try {
    const token = import.meta.env.VITE_TMDB_TOKEN;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);

    if (response.status === 401) {
      throw new Error(
        "The movie service is temporarily unavailable. Please try again later.",
      );
    }

    if (!response.ok) {
      throw new Error(
        "Something went wrong while loading movies. Please try again.",
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect. Check your internet connection and try again.",
        {
          cause: error,
        },
      );
    }

    throw error;
  }
}

export async function getGenres() {
  const baseUrl = "https://api.themoviedb.org/3/genre/movie/list";
  try {
    const token = import.meta.env.VITE_TMDB_TOKEN;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseUrl, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch movie genres: ${response.status}`);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    throw new Error(`Movie genre failed: ${error.message}`, {
      cause: error,
    });
  }
}
