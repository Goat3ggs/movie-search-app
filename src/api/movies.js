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

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(`Movie search failed: ${error.message}`, {
      cause: error,
    });
  }
}
