import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_G19FfMtgD8O25YjIdRVXjBrhxG0eAidpMpueqFt8EiTXvhoRG36FHYPNUxXXlekx";

function fetchBreeds() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function fetchCatByBreed(breedId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export { fetchBreeds, fetchCatByBreed };