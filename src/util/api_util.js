import { AllHtmlEntities as entities } from 'html-entities';

const baseURL = 'https://www.googleapis.com/books/v1';

const defaultParams = {
  maxResults: 20,
  printType: 'books',
};

const parseResponseData = ({ items, totalItems }) => ({
  results: (items || []).map(({ id, searchInfo, volumeInfo }) => {
    const {
      authors,
      title,
      subtitle,
      publisher,
      publishedDate,
      imageLinks,
      previewLink,
    } = volumeInfo;
    const textSnippet = searchInfo ? searchInfo.textSnippet : '';

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
  }),
  totalItems
});

export const getBooks = params => {
  const q = encodeURI(params.q.replace(/ /g, '+').replace(/"/g, ''));
  const paramsString = Object.entries({ ...defaultParams, ...params, q })
    .map(param => param.join('='))
    .join('&');

  return fetch(`${baseURL}/volumes?${paramsString}`)
    .then(res => res.json())
    .then(parseResponseData);
};
