const baseURL = "https://www.googleapis.com/books/v1";

// const key= "AIzaSyBGqCR87W4Tg_c5T2QMWLSFn0x0RHQgNJg"

const parseResponseData = ({ items }) =>
  items.map(({ id, volumeInfo: { authors, title, publisher, imageLinks } }) => ({
    id,
    authors,
    title,
    publisher,
    imageLinks,
  }));

export const getBooks = query =>
  fetch(`${baseURL}/volumes?q=${query}`)
    .then(res => res.json())
    .then(data => console.log(parseResponseData(data)));
