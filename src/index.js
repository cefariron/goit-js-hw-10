import '/node_modules/slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { TheCatAPI } from '@thatapicompany/thecatapi';
import axios from 'axios';
import SlimSelect from 'slim-select'

new SlimSelect({               //  Библиотека SlimSelect. Подключена, но если
  select: '#selectElement'     //  инициализировать ее, все ломается. Как 
})                             //  исправить незнаю. Сдаю без нее.

new TheCatAPI(
  'live_s8nipvOVu9x7M1Oib237fV73mUqJ5mMbosZrl0Spq6nATwMKfjepogDKSlr2wzo8'
);
axios.defaults.headers.common['x-api-key'] =
  'live_s8nipvOVu9x7M1Oib237fV73mUqJ5mMbosZrl0Spq6nATwMKfjepogDKSlr2wzo8';

const selectEl = document.querySelector('.breed-select');
const loadingEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

loadingEl.style.display = 'block';

fetchBreeds(selectEl, loadingEl, errorEl);

selectEl.addEventListener('change', handleSelectChange);

async function handleSelectChange() {
  const selectedBreedId = selectEl.value;

  catInfoEl.style.display = 'none';
  loadingEl.style.display = 'block';

  const catData = await fetchCatByBreed(selectedBreedId, loadingEl, selectEl, errorEl);

  createMarkup(catData);

  loadingEl.style.display = 'none';
  catInfoEl.style.display = 'flex';
}

function createMarkup({ name, description, temperament, imageUrl }) {
  const markup = `
    <img class="cat-img" style="object-fit: cover; border-radius: 16px" src="${imageUrl}" alt="${name}" width="500" height="400">
    <div class="descr-box" style="width: 600px">
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p> 
    </div>
  `;
  catInfoEl.innerHTML = markup;
  catInfoEl.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.2)';
}
