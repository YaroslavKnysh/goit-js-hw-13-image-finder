import apiService from './apiService.js';
import photoCardTpl from './photoCard.hbs';
import debounce from 'lodash.debounce';

const inputEl = document.querySelector('.search-form_input');
const galleryListEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.button');

let pageNumber = 0;
let arrayPhotos = [];
let searchValue = '';

const findPhotoFn = e => {
  // localStorage.setItem('namePhoto', searchValue);
  if (e.target.value.length != 0) {
    arrayPhotos = [];
    searchValue = e.target.value;
    pageNumber = 1;
  }
  // else if ((e.target.value = '')) {
  //   pageNumber = 1;
  // }
  else {
    pageNumber++;
  }

  apiService(searchValue, pageNumber)
    .then(response => response.json())
    .then(photos => {
      arrayPhotos = [...arrayPhotos, photos.hits.map(photoCardTpl).join('')];

      galleryListEl.innerHTML = arrayPhotos;

      const firstPhotoId = document.getElementById(photos.hits[0].id);

      firstPhotoId.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
};

inputEl.addEventListener('input', debounce(findPhotoFn, 500));
buttonEl.addEventListener('click', findPhotoFn);

// let localStorageSave = localStorage.getItem('namePhoto');
// if (localStorageSave !== undefined) {
//   findPhotoFn({ target: { value: localStorageSave } });
//   inputEl.value = localStorageSave;
// }
