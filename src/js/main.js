import apiService from './apiService.js';
import photoCardTpl from './photoCard.hbs';
import debounce from 'lodash.debounce';

const inputEl = document.querySelector('.search-form_input');
const galleryListEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.button');
console.dir(inputEl);
console.log(galleryListEl);
console.log(buttonEl);

console.dir(apiService);
let pageNumber = 0;
let arrayPhotos = [];
let searchValue = '';

const findPhotoFn = e => {
  galleryListEl.innerHTML = '';

  if (e.target.value.length != 0) {
    searchValue = e.target.value;
    pageNumber = 1;
  } else {
    pageNumber++;
  }
  console.log(e.target.value.length);
  apiService(searchValue, pageNumber)
    .then(response => response.json())
    .then(photos => {
      arrayPhotos = [...arrayPhotos, photos.hits.map(photoCardTpl).join('')];

      galleryListEl.innerHTML = arrayPhotos;

      const element = document.getElementById(photos.hits[0].id);

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
};

buttonEl.addEventListener('click', findPhotoFn);

inputEl.addEventListener('input', debounce(findPhotoFn, 500));
