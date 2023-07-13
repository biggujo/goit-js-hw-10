import '~node_modules/modern-normalize/modern-normalize.css';
import '~node_modules/slim-select/dist/slimselect.css';

import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  select: new SlimSelect({
    select: '#breed-select',
    events: {
      afterChange: ([
        {
          value: breedId,
        },
      ]) => {
        fetchCatByBreed(breedId)
        .then((breedInfo) => {
          renderCatInfoMarkup(createCatInfoMarkup(breedInfo));
        });
      },
    },
  }),
  output: document.querySelector('.cat-info__info'),
};

fetchBreeds()
.then((breedsArray) => {
  setOptionsArray(createOptionsArray(breedsArray));
})
.catch(console.log);

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

  return `<div class='cat-info__column'>
              <img src='${url}' alt='A photo of ${name} cat' width='400'>
            </div>
            <div class='cat-info__column'>
              <h2 class='cat-info__title'>${name}</h2>
              <p class='cat-info__text'>${description}</p>
              <p><b>Temperament: </b>${temperament}</p>
            </div>`;
}

function renderCatInfoMarkup(markup) {
  refs.output.innerHTML = markup;
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