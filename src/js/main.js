import apiService from './apiService.js';
import photoCardTpl from './photoCard.hbs';
import debounce from 'lodash.debounce';

const inputEl = document.querySelector('.search-form_input');
const galleryListEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.button');
console.dir(inputEl);
console.log(galleryListEl);
console.log(buttonEl);

const findPhotoFn = e => {
  galleryListEl.innerHTML = '';
  fetchPhoto(e.target.value, 1)
    .then(response => response.json())
    .then(console.log);
};

inputEl.addEventListener('input', debounce(findPhotoFn, 500));
