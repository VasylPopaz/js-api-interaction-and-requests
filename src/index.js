import axios from 'axios';
import { fetchBreeds, fetchCatByBreed, breedSelect } from './js/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_WOaQAF0RnyKDa5CuJOs4uDZY9MVeQfPUJopAbHhgZb358lDw4LvIr5XH21OlJpmu';

fetchBreeds();

breedSelect.addEventListener('change', () => {
  fetchCatByBreed(breedSelect.value);
});
