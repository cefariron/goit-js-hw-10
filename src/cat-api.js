import axios from 'axios';

export async function fetchBreeds(selectEl, loadingEl) {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');

    loadingEl.style.display = 'none';

    response.data.forEach(elem => {
      const optionEl = document.createElement('option');
      optionEl.value = elem.id;
      optionEl.textContent = elem.name;
      selectEl.append(optionEl);
    });
  } catch (error) {
    loadingEl.style.display = 'none';
    throw new Error(error);
  }
}

