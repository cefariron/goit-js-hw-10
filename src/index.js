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



catInfoEl.style.display = "flex";
catInfoEl.style.gap = "30px";

axios
  .get('https://api.thecatapi.com/v1/breeds')
  .then(resp => {
    resp.data.forEach(elem => {
      const optionEl = document.createElement('option');
      optionEl.value = elem.id;
      optionEl.textContent = elem.name;
      selectEl.append(optionEl);
    });
  })
  .catch(error => {
    throw new Error(error);
  });

selectEl.addEventListener('change', handleSelectChange);

function handleSelectChange() {
  const selectedBreedId = selectEl.value;
  console.log('Вибрано породу з ID:', selectedBreedId);
  fetchCatByBreed(selectedBreedId)
}

function createMarkup({ name, description, temperament, imageUrl }) {
    const markup = `
        <img class="cat-img" style="object-fit: cover" src="${imageUrl}" alt="${name}" width="400" height="300">
        <div class="descr-box" max-width="500px">
        <h2>${name}</h2>
        <p>${description}</p>
        <h3>Temperament: </h3>
        <p>${temperament}</p> 
        </div>
    `;
return catInfoEl.innerHTML = markup
}


async function fetchCatByBreed(selectedBreedId) {
    await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`)
    .then(resp => {
        resp.data.map(item => {
            const breedData = item.breeds[0];
            const dataCatObj = {
                name: breedData.name,
                description: breedData.description,
                temperament: breedData.temperament,
                imageUrl: item.url
              }
              createMarkup(dataCatObj)
        })
    })
    .catch(err => {
        throw new Error(err);
    })

    // createMarkup(dataCatObj)
}

