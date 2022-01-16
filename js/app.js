// selectors

const auth = ['563492ad6f917000010000012a16e098bf4c44cdb78882ba83cc35d0'];
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let fetchLink;
let searchValue;
let page = 1;

const more = document.querySelector('.more');
let currentSearch;

// event listener
searchInput.addEventListener('input', updateInput);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

form.addEventListener('click', loadMore);
// updat input
function updateInput(e) {
  searchValue = e.target.value;
}

// ferch api
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

//  generate photos

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');

    galleryImg.innerHTML = `
      <div class="gallery-info">
        <p>${photo.photographer}</p>

        <a href="https://www.pexels.com/photo/${photo.id}/download" download="${photo.alt}"> 
        <i class="fas fa-arrow-down"></i>
      
        </div>
        <img src="${photo.src.large}"></img>
        </a>
      `;
    gallery.appendChild(galleryImg);
  });
}

//  Cureated photos

async function cureatedPhotos() {
  fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
  const data = await fetchApi(fetchLink);
  generatePictures(data);
  console.log(data);
}

cureatedPhotos();

// clear
function clear() {
  gallery.innerHTML = '';
  searchInput.innerHTML = '';
}
// search photos
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

// load more

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
