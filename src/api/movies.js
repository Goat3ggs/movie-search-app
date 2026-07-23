export async function searchMovies(movieName, page = 1) {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";

  const yearMatch = movieName.match(/\b(19|20)\d{2}\b/);

  const releaseYear = yearMatch ? yearMatch[0] : "";

  const movieQuery = yearMatch
    ? movieName.replace(yearMatch[0], "").trim()
    : movieName.trim();

  const params = new URLSearchParams({
    query: movieQuery,
    include_adult: false,
    page: page,
  });

  if (releaseYear) {
    params.append("primary_release_year", releaseYear);
  }

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

    const normalizedQuery = movieQuery.toLowerCase();

    const sortedResults = [...data.results].sort((firstMovie, secondMovie) => {
      const firstTitle = firstMovie.title.toLowerCase();
      const secondTitle = secondMovie.title.toLowerCase();

      const firstStartsWithQuery = firstTitle.startsWith(normalizedQuery);
      const secondStartsWithQuery = secondTitle.startsWith(normalizedQuery);

      if (firstStartsWithQuery !== secondStartsWithQuery) {
        return secondStartsWithQuery - firstStartsWithQuery;
      }

      if (secondMovie.popularity !== firstMovie.popularity) {
        return secondMovie.popularity - firstMovie.popularity;
      }

      return secondMovie.vote_count - firstMovie.vote_count;
    });

    return {
      results: sortedResults,
      totalPages: data.total_pages,
    };
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

export async function discoverMovies(page = 1) {
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";

  const params = new URLSearchParams({
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: page,
    sort_by: "popularity.desc",
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
    return {
      results: data.results,
      totalPages: data.total_pages,
    };
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
searchMovies("Batman", 2);
discoverMovies(2);
