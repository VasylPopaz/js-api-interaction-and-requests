const options = {
  headers: {
    'x-api-key':
      'live_WOaQAF0RnyKDa5CuJOs4uDZY9MVeQfPUJopAbHhgZb358lDw4LvIr5XH21OlJpmu',
  },
};

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
