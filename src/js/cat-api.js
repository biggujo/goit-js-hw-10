import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_GH5xb89M4mPrxepX0k4MzbvqZrhMGe5LLLaAglOFVXNzVie37XlZKLMyI7nBI51V';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`)
  .then((response) => {
    if (response.status !== 200) {
      throw new Error(String(response.status));
    }

    return response.data;
  });
}

function fetchCatImageByBreed(breedId) {
  const parameters = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios.get(`${BASE_URL}/images/search?${parameters}`)
  .then((response) => {
    if (response.status !== 200) {
      throw new Error(String(response.status));
    }

    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  fetchBreeds()
  .then((breedArray) => {
    fetchCatImageByBreed(breedId)
    .then((image) => {
      const breedIdInfo = breedArray.find(({ id }) => id === breedId);

      console.log({
        ...breedIdInfo,
        image,
      });

      return {
        ...breedIdInfo,
        image,
      };
    });
  });
}