import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

export const breedSelect = document.querySelector('.breed-select');
const divInfo = document.querySelector('.cat-info');
const loaderElem = document.querySelector('.loader');
Notiflix.Notify.init({
  position: 'center-top',
});
let dataItems = [];

function showElement(element) {
  element.classList.remove('hide');
}
function hideElement(element) {
  element.classList.add('hide');
}

export function fetchBreeds() {
  hideElement(divInfo);
  // const BASE_URL = 'https://api.thecatapi.com';
  // const END_POINT = '/v1/breeds';
  // const url = `${BASE_URL}${END_POINT}`;
  // fetch(url);
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      hideElement(loaderElem);
      showElement(breedSelect);
      return response.json();
    })
    .then(receivedData => {
      dataItems = receivedData;
      const markup = receivedData
        .map(item => {
          return `<option value=${item.id}>${item.name}</option>`;
        })
        .join('');
      breedSelect.innerHTML = markup;
      const customSelect = new SlimSelect({
        select: breedSelect,
        settings: {
          placeholderText: 'Choose cat breed',
        },
      });
    })
    .catch(error => {
      hideElement(loaderElem);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error.name);
      console.log(error.message);
    });
}

export function fetchCatByBreed(breedId) {
  hideElement(divInfo);
  showElement(loaderElem);
  // const BASE_URL = 'https://api.thecatapi.com';
  // const END_POINT = '/v1/images/search';
  // const PARAMS = new URLSearchParams({ breedId });
  // const url = `${BASE_URL}${END_POINT}?${PARAMS}`;
  // const options = {
  //   headers: {
  //     'x-api-key':
  //       'live_WOaQAF0RnyKDa5CuJOs4uDZY9MVeQfPUJopAbHhgZb358lDw4LvIr5XH21OlJpmu',
  //   },
  // };
  // fetch(url, options);
  fetch(`https://api.thecatapi.com/v1/images/search?${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(([selectedItem]) => {
      const { name, description, temperament } = dataItems.find(
        item => item.id === breedSelect.value
      );
      const markup = ` <img class="cat-img" src="${selectedItem.url}" alt="Cat">
      <div class="description-container">
        <h2 class="description-container-title">${name}</h2>
        <p class="description-container-text">${description}</p>
        <p class="description-container-text"><span class="description-container-span">Temperament:</span> ${temperament}</p>
      </div> `;
      divInfo.innerHTML = markup;
      hideElement(loaderElem);
      showElement(divInfo);
    })
    .catch(error => {
      hideElement(loaderElem);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error.name);
      console.log(error.message);
    });
}
