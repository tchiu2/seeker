# Seeker
[Live](https://tc-seeker.netlify.com/)

Seeker allows users to search for books using a simple, pleasant user interface.

### Technologies Used
- React
- JavaScript
- Jest/Enzyme for unit tests
- [Google Books API](https://developers.google.com/books/) for book information
- [Evergreen](https://evergreen.segment.com/) for UI components


### Core Features
You can:
1. Type in a query to get a list of books matching that query.
2. View results with the following information:
   1. Author(s)
   2. Title (including subtitle)
   3. Publisher
   4. Published year
   5. Thumbnail of book/book cover
   6. Link to Google Books preview page
3. Click an author's name in a search result to search by that author.
4. Infinitely load paginated results for a given query until the Books API has no more results.

Seeker also has utility functions that handle correctly forming requests for as well as parsing responses from the Google Books API.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
