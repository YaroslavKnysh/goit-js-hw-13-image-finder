import apiService from './apiService.js';
import photoCardTpl from './photoCard.hbs';
import debounce from 'lodash.debounce';

const inputEl = document.querySelector('.search-form_input');
const galleryListEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.button');

let pageNumber = 1;

let searchValue = '';

const apiServiceFn = async () => {
  let response = await apiService(searchValue, pageNumber);
  let photos = await response.json();

  const listPhotos = photos.hits.map(photoCardTpl).join('');

  galleryListEl.insertAdjacentHTML('beforeend', listPhotos);
};

const findPhotoFn = e => {
  localStorage.setItem('namePhoto', e.target.value);
  galleryListEl.innerHTML = '';
  searchValue = e.target.value;
  pageNumber = 1;

  if (e.target.value.length > 0) {
    apiServiceFn();
    buttonEl.classList.remove('is_hidden');
  } else {
    buttonEl.classList.add('is_hidden');
  }
};
const findPhotoNextFn = e => {
  pageNumber++;
  apiServiceFn();
  // const firstPhotoId = document.getElementById(photos.hits[0].id);

  // firstPhotoId.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'end',
  // });
};

inputEl.addEventListener('input', debounce(findPhotoFn, 500));
buttonEl.addEventListener('click', findPhotoNextFn);

let localStorageSave = localStorage.getItem('namePhoto');
if (localStorageSave !== undefined) {
  findPhotoFn({ target: { value: localStorageSave } });
  inputEl.value = localStorageSave;
}
