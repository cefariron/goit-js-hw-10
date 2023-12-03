import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import '/node_modules/slim-select/dist/slimselect.css';

export async function fetchBreeds(selectEl, loadingEl, errorEl) {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');

    loadingEl.style.display = 'none';

    response.data.forEach(elem => {
      const optionEl = document.createElement('option');
      optionEl.value = elem.id;
      optionEl.textContent = elem.name;
      selectEl.append(optionEl);
    });
    new SlimSelect({
      select: '#selectElement'
    })
    
  } catch (error) {
    loadingEl.style.display = 'none';
    selectEl.style.display = 'none';
    // errorEl.style.display = 'block'; // Раскоментировать для вывода текстового контента об ошибке на страницу.

    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');

    throw new Error(error);
  }
}

export async function fetchCatByBreed(selectedBreedId, loadingEl, selectEl, errorEl) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`
    );

    const item = response.data[0];
    const breedData = item.breeds[0];

    return {
      name: breedData.name,
      description: breedData.description,
      temperament: breedData.temperament,
      imageUrl: item.url,
    };
  } catch (error) {
    loadingEl.style.display = 'none';
    selectEl.style.display = 'none';
    // errorEl.style.display = 'block'; // Раскоментировать для вывода текстового контента об ошибке на страницу.

    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');

    throw new Error(error);
  }
}
