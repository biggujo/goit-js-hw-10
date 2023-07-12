import { fetchBreeds } from './js/cat-api';

const refs = {
  selectBar: document.querySelector('.breed-select'),
};

fetchBreeds()
.then((breedsArray) => {
  renderOptionsMarkup(createOptionsMarkup(breedsArray));
})
.catch(console.log);

function createOptionsMarkup(breeds) {
  return breeds.map(({
    id,
    name,
  }) => {
    return `<option value='${id}'>${name}</option>`;
  });
}

function renderOptionsMarkup(markup) {
  refs.selectBar.innerHTML = markup;
}