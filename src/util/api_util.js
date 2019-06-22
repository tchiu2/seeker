import { AllHtmlEntities as entities } from 'html-entities';

const baseURL = "https://www.googleapis.com/books/v1";

const defaultOpts = {
  maxResults: 20,
  printType: "books",
};

const parseResponseData = ({ items }) =>
  (items || []).map(({ id, searchInfo, volumeInfo }) => {
    const {
      authors,
      title,
      subtitle,
      publisher,
      publishedDate,
      imageLinks,
      previewLink,
    } = volumeInfo;
    const textSnippet = searchInfo ? searchInfo.textSnippet : "";

    return {
      id,
      authors,
      title,
      subtitle,
      publisher,
      publishedDate,
      thumbnail: imageLinks && imageLinks.thumbnail,
      textSnippet: entities.decode(textSnippet),
      previewLink,
    };
  });

export const getBooks = (options) => {
  const q = options.q.split(" ").join("+");
  const optionsString = Object.entries({ ...defaultOpts, ...options, q })
    .map(option => option.join("="))
    .join("&");

  return fetch(`${baseURL}/volumes?${optionsString}`)
    .then(res => res.json())
    .then(parseResponseData);
}
