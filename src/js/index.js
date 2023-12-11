import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { catInfoTemplate, optionsTemplate } from './markup';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
Notiflix.Notify.init({
  position: 'center-top',
});

const breedSelect = document.querySelector('.breed-select');
const divInfo = document.querySelector('.cat-info');
const loaderElem = document.querySelector('.loader');
hideElement(divInfo);

function showElement(element) {
  element.classList.remove('hide');
}
function hideElement(element) {
  element.classList.add('hide');
}

fetchBreeds()
  .then(receivedData => {
    hideElement(loaderElem);
    showElement(breedSelect);
    breedSelect.innerHTML = optionsTemplate(receivedData);
    new SlimSelect({
      select: '#breed-select',
    });

    breedSelect.addEventListener('change', () => {
      hideElement(divInfo);
      showElement(loaderElem);
      fetchCatByBreed(breedSelect.value)
        .then(data => {
          const { url } = data[0];
          const breedInfo = data[0].breeds[0];
          divInfo.innerHTML = catInfoTemplate(url, breedInfo);
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
