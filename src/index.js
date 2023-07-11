import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_GH5xb89M4mPrxepX0k4MzbvqZrhMGe5LLLaAglOFVXNzVie37XlZKLMyI7nBI51V';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

axios.get(BASE_URL)
.then((response) => {
  if (response.status !== 200) {
    throw new Error(String(response.status));
  }

  return response.data;
})
.then((breeds) => {
  return breeds.map(({ name }) => name);
})
.then((breedNames) => console.log(breedNames))
.catch((reason) => console.log(reason));