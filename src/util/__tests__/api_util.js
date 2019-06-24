import { getBooks } from '../api_util';

describe('Google Books API util', () => {
  let params;

  beforeEach(() => {
    params = {
      q: 'foo',
      maxResults: 1,
      printType: 'books',
    };
  });

  const mockSucessResponse = {
    items: [
      {
        volumeInfo: {
          title: 'foo',
          authors: ['bar'],
        }
      }
    ],
    totalItems: 1,
  };
  const mockJsonPromise = Promise.resolve(mockSucessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  it('exports a getBooks function', () => {
    expect(getBooks).toBeDefined();
  });

  it('takes a params object and uses it to build the request URL', done => {
    const requestUrl = 'https://www.googleapis.com/books/v1/volumes?maxResults=1&printType=books&q=foo';

    getBooks(params)
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(requestUrl);

    done();
  });

  it('parses the response into the appropriate format', done => {
    getBooks(params)
      .then(data => {
        expect(data).toHaveProperty('results');
        expect(data).toHaveProperty('totalItems');
        expect(data).toHaveProperty(['results', 0, 'title'], 'foo');
        expect(data).toHaveProperty(['results', 0, 'authors', 0], 'bar');
      });
    done();
  });
});
