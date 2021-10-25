export default function fetchPhoto(searchQuery, pageNumber) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=23926259-20170b2e8904d12034176c2be`,
  );
}
