export function optionsTemplate(receivedData) {
  return receivedData
    .map(item => {
      return `<option value=${item.id}>${item.name}</option>`;
    })
    .join('');
}

export function catInfoTemplate(url, { name, description, temperament }) {
  return ` <img class="cat-img" src="${url}" alt="Cat">
      <div class="description-container">
        <h2 class="description-container-title">${name}</h2>
        <p class="description-container-text">${description}</p>
        <p class="description-container-text"><span class="description-container-span">Temperament:</span> ${temperament}</p>
      </div> `;
}
