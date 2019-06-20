import { AllHtmlEntities as entities } from 'html-entities';

const baseURL = "https://www.googleapis.com/books/v1";

const defaultOpts = {
  maxResults: 20,
  printType: "books",
};

const parseResponseData = ({ items }) =>
  items
    ? items.map(({ id, searchInfo, volumeInfo }) => {
        const {
          authors,
          title,
          subtitle,
          publisher,
          publishedDate,
          imageLinks,
          previewLink,
        } = volumeInfo;
        const { textSnippet } = searchInfo || { textSnippet: "" };

        return {
          id,
          authors: authors ? authors.join(", ") : "",
          title: title + (subtitle ? `: ${subtitle}` : ""),
          publisher,
          publishedDate: publishedDate || "",
          thumbnail: (imageLinks && imageLinks.thumbnail) || "",
          textSnippet: entities.decode(textSnippet),
          previewLink,
        };
      })
   : [];

export const getBooks = (query, page = 1, options = defaultOpts) => {
  const optionsString = Object.entries(options)
    .map(option => `${option[0]}=${option[1]}`)
    .join("&");

  const startIndex = (page - 1) * options.maxResults;

  return fetch(`${baseURL}/volumes?q=${query}&startIndex=${startIndex}&${optionsString}`)
    .then(res => res.json())
    .then(parseResponseData);
}
