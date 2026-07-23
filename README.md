# Movie Search App

A responsive movie discovery application built with React and Vite. The app uses the TMDB API to display popular movies, search by title, open a movie details view, and progressively load more results while the user scrolls.

Built as the Week 3 project from a 12-week frontend practice roadmap, with a focus on React fundamentals: components, props, state, conditional rendering, and useEffect.

---

## Demo

[Live Demo]()

## Preview

![Movie Search App Screenshot]()

---

## Features

- Popular movies displayed on the home page
- Movie search by title
- Optional year in the search text
- Debounced automatic search after the user stops typing
- Immediate search through Enter or the Search button
- Minimum search length validation
- Infinite scroll for progressively loading additional pages
- Movie details view with poster, title, release year, and overview
- Genre names displayed on movie cards
- Loading, validation error, request error, and empty states
- Missing-poster fallback image
- Accessible poster alternative text
- Keyboard-accessible movie cards
- Responsive, mobile-first layout
- Back-to-top button
- Clickable brand that returns to the popular movies view

---

## Search Flow

1. The search input is controlled by React state.
2. Empty input does not trigger an API request.
3. Queries shorter than three characters are ignored by automatic search.
4. A timer starts after every valid input change.
5. Typing again before 600 ms cancels the previous timer.
6. When the timer finishes, the query state is updated.
7. Updating the query state triggers the movie search effect.
8. A manual submit skips the debounce delay and searches immediately.
9. Starting a new search resets pagination to page 1.
10. Additional search pages are appended through infinite scroll.

---

## Infinite Scroll Flow

The application uses IntersectionObserver to watch a small sentinel element rendered after the movie list.

Sentinel approaches the viewport
↓
Check that no request is already running
↓
Check that another API page exists
↓
Increase the page state
↓
Fetch the next page
↓
Append the new movies to the existing list

The existing list remains visible while later pages are loading.

---

## Tech Stack

- React
- Vite
- JavaScript
- JSX
- CSS
- Fetch API
- TMDB API
- Intersection Observer API

---

## React Concepts Practiced

- Functional components
- Props
- Controlled inputs
- Local state with useState
- Side effects with useEffect
- DOM references with useRef
- Conditional rendering
- Event handling
- Async/await
- Error handling
- Debouncing
- Progressive pagination

---

## Component Structure

```text
src/
├── api/
│   └── movies.js
├── components/
│   ├── BackToTop.jsx
│   ├── EmptyState.jsx
│   ├── ErrorMessage.jsx
│   ├── Loading.jsx
│   ├── MovieCard.jsx
│   ├── MovieDetails.jsx
│   ├── MovieList.jsx
│   └── SearchBar.jsx
├── styles/
│   ├── base.css
│   ├── components.css
│   └── layout.css
├── App.jsx
├── main.jsx
└── index.css
```

---

## Component Responsibilities

### `App`

Manages the main application logic:

- movie discovery and search
- pagination and infinite scroll
- loading and error states
- debounce behavior
- selected movie and current view

### `SearchBar`

Displays the brand and controlled search form. It also provides navigation back to the home view.

### `MovieList`

Renders the movie collection as a responsive grid.

### `MovieCard`

Displays the poster, title, release year, and genre. Supports mouse and keyboard interaction.

### `MovieDetails`

Displays information about the selected movie and provides a Back button.

### UI State Components

`Loading`, `ErrorMessage`, and `EmptyState` provide reusable feedback states.

### `BackToTop`

Appears after scrolling and smoothly returns the page to the top.

---

## State Overview

The main state includes:

```js
isLoading;
inputValue;
searchQuery;
movies;
genres;
selectedMovie;
page;
totalPages;
viewMode;
validationError;
requestError;
```

`viewMode` controls the current list:

```text
home   → popular movies
search → search results
```

---

## API Functions

```js
discoverMovies(page);
searchMovies(query, page);
getGenres();
```

Movie requests return:

```js
{
  results: [],
  totalPages: 1,
}
```

---

## Getting Started

### Prerequisites

- Node.js v24.11.1
- npm
- TMDB read-access token

---

## Accessibility

The application includes:

- descriptive poster alt text
- fallback titles and posters
- keyboard-accessible movie cards
- Enter and Space support
- visible focus styles
- labeled search controls
- accessible loading states
- reduced-motion support

---

## Responsive Design

The project uses a mobile-first approach:

- responsive movie grid
- stacked movie details on mobile
- side-by-side details on larger screens
- responsive page spacing
- adaptive navbar and search layout

---

## Error Handling

The application separates:

- **Validation errors** — empty or short queries
- **Request errors** — network or API failures

Validation errors do not remove the current movie list.

---

## Known Limitations

- Browser Back and Forward do not control internal views because React Router is not used yet.
- Short searches may return obscure TMDB matches.
- Search ordering depends on the results returned by each API page.
- Movie details currently contain limited information.

---

## Future Improvements

- React Router integration
- URL-based search and movie details
- rating, genre, and year filters
- sorting controls
- cast, trailer, runtime, and rating details
- favorites or watchlist
- skeleton loaders
- request cancellation with `AbortController`
- automated tests

---

## What I Learned

During this project, I practiced:

- building small React components
- managing state ownership
- passing props and handlers
- fetching and displaying API data
- conditional rendering
- debouncing input
- handling loading, empty, and error states
- implementing pagination and infinite scroll
- building responsive and accessible interfaces

---

## Deployment

Platform: Vercel

Production URL: `<ADD_DEPLOYED_URL>`

---

## Credits

- Movie data and posters: TMDB

---

## Author

**Stefania Grifore**

- GitHub: <Goat3ggs>
- LinkedIn: [Grigore Stefania](www.linkedin.com/in/grigore-any-mary-stefania)

---

## License

This project was created for educational purposes.
