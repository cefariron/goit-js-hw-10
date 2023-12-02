import { fetchBreeds } from './cat-api';
import { TheCatAPI } from '@thatapicompany/thecatapi';
import axios from 'axios';

const theCatAPI = new TheCatAPI(
  'live_s8nipvOVu9x7M1Oib237fV73mUqJ5mMbosZrl0Spq6nATwMKfjepogDKSlr2wzo8'
);
axios.defaults.headers.common['x-api-key'] =
  'live_s8nipvOVu9x7M1Oib237fV73mUqJ5mMbosZrl0Spq6nATwMKfjepogDKSlr2wzo8';

const selectEl = document.querySelector('.breed-select');
const loadingEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

catInfoEl.style.display = 'flex';
catInfoEl.style.gap = '30px';

loadingEl.style.display = 'block';

fetchBreeds(selectEl, loadingEl);

selectEl.addEventListener('change', handleSelectChange);

async function handleSelectChange() {
  const selectedBreedId = selectEl.value;

  catInfoEl.style.display = 'none';
  loadingEl.style.display = 'block';

  await fetchCatByBreed(selectedBreedId);

  loadingEl.style.display = 'none';
  catInfoEl.style.display = 'flex';
}

function createMarkup({ name, description, temperament, imageUrl }) {
  const markup = `
    <img class="cat-img" style="object-fit: cover" src="${imageUrl}" alt="${name}" width="500" height="400">
    <div class="descr-box" style="width: 600px">
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p> 
    </div>
  `;
  catInfoEl.innerHTML = markup;
}

async function fetchCatByBreed(selectedBreedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`
    );
    response.data.forEach(item => {
      const breedData = item.breeds[0];
      const dataCatObj = {
        name: breedData.name,
        description: breedData.description,
        temperament: breedData.temperament,
        imageUrl: item.url,
      };
      createMarkup(dataCatObj);
    });
  } catch (error) {
    loadingEl.style.display = 'none';
    selectEl.style.display = 'none';
    errorEl.style.display = 'block';

    throw new Error(error);
  }
}


