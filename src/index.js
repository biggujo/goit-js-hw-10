import '~node_modules/modern-normalize/modern-normalize.css';
import '~node_modules/slim-select/dist/slimselect.css';

import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Loader from './js/loader';
import { Notify } from 'notiflix';

const refs = {
  select: new SlimSelect({
    select: '#breed-select',
    events: {
      afterChange: onBreedSelect,
    },
  }),
  loader: new Loader('loader'),
  output: document.getElementById('cat-output'),
};

// Removes empty block from the page
hideRenderCatInfoMarkup();

fetchAllBreeds();

function onBreedSelect([
  {
    value: breedId,
  },
]) {
  refs.loader.showLoader();

  hideRenderCatInfoMarkup();

  fetchCatByBreed(breedId)
  .then((breedInfo) => {
    renderCatInfoMarkup(createCatInfoMarkup(breedInfo));
  })
  .catch(({ message }) => Notify.failure(message))
  .finally(() => refs.loader.hideLoader());
}

function fetchAllBreeds() {
  refs.loader.showLoader();

  fetchBreeds()
  .then((breedsArray) => {
    setOptionsArray(createOptionsArray(breedsArray));
  })
  .catch(({ message }) => Notify.failure(message));
}

function createCatInfoMarkup([breedInfoById]) {
  const {
    url,
    breeds,
  } = breedInfoById;

  const {
    name,
    description,
    temperament,
  } = breeds[0];

  return `<div class='cat-info'>
            <div class='cat-info__column'>
              <img src='${url}' class='cat-info__image' alt='A photo of ${name} cat' width='400' height='400'>
            </div>
            <div class='cat-info__column'>
              <h2 class='cat-info__title'>${name}</h2>
              <p class='cat-info__text'>${description}</p>
              <p><b>Temperament: </b>${temperament}</p>
            </div>
          </div>`;
}

function renderCatInfoMarkup(markup) {
  refs.output.innerHTML = markup;

  refs.output.classList.remove('visually-hidden');
}

function hideRenderCatInfoMarkup() {
  refs.output.classList.add('visually-hidden');
}

function createOptionsArray(breeds) {
  return breeds.map(({
    id,
    name,
  }) => ({
    text: name,
    value: id,
  }));
}

function setOptionsArray(optionsArray) {
  refs.select.setData(optionsArray);
}