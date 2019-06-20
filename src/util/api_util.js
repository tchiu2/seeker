const baseURL = "https://www.googleapis.com/books/v1";

const defaultOpts = {
  maxResults: 20,
  printType: "books",
};

const parseResponseData = ({ items }) =>
  items.map(({ id, searchInfo, volumeInfo }) => {
    const { authors, title, subtitle, publisher, imageLinks } = volumeInfo;
    const { textSnippet } = searchInfo || { textSnippet: "" };
    return {
      id,
      authors,
      title,
      subtitle,
      publisher,
      imageLinks,
      textSnippet,
    };
  });

export const getBooks = (query, page = 1, options = defaultOpts) => {
  const optionsString = Object.entries(options)
    .map(option => `${option[0]}=${option[1]}`)
    .join("&");

  const startIndex = (page - 1) * options.maxResults;

  return fetch(`${baseURL}/volumes?q=${query}&startIndex=${startIndex}&${optionsString}`)
    .then(res => res.json())
    .then(data => parseResponseData(data));
}
