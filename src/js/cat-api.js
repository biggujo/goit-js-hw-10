import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_GH5xb89M4mPrxepX0k4MzbvqZrhMGe5LLLaAglOFVXNzVie37XlZKLMyI7nBI51V';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreeds() {
  return axios.get(BASE_URL)
  .then((response) => {
    if (response.status !== 200) {
      throw new Error(String(response.status));
    }

    return response.data;
  });
}