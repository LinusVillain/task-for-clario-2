'use strict';

const MIN_SYMBOLS = 4;
const DEBOUNCE_INTERVAL = 3000;
const searchInput = document.querySelector(`.book-search-input`);
const searchResult = document.querySelector(`.book-search-result`);

const createBook = (book) => {
    const foundBook = document.createElement(`article`);
    foundBook.style.border = `2px solid black`;
    foundBook.style.margin = `10px`;
    
    const foundBookTitle = document.createElement(`p`);
    foundBookTitle.textContent = `Название: ${book.volumeInfo.title}`;
    foundBook.append(foundBookTitle);

    const foundBookAuthors = document.createElement(`p`);
    foundBookAuthors.textContent = `Автор(ы): ${book.volumeInfo.authors}`;
    foundBook.append(foundBookAuthors);

    const foundBookPublishedDate = document.createElement(`p`);
    foundBookPublishedDate.textContent = `Дата публикации: ${book.volumeInfo.publishedDate}`;
    foundBook.append(foundBookPublishedDate);

    return foundBook;
};

const renderResults = (data) => {
    
    searchResult.innerHTML = ``;
    const resultFragment = document.createDocumentFragment();

    for (let book of data.items) {
        resultFragment.appendChild(createBook(book));
    }

    searchResult.appendChild(resultFragment);
};

const onSearchInput = () => {

    let searchText = searchInput.value;
    searchText = searchText.replace(/ /g,"+");

    if (searchText.length >= MIN_SYMBOLS) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            renderResults(data);
        });
    }
}

const debounce = (cb) => {
    let lastTimeout = null;

    return () => {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
  
        lastTimeout = window.setTimeout(() => {
          cb();
        }, DEBOUNCE_INTERVAL);
      };
    };

searchInput.addEventListener(`input`, debounce(onSearchInput));