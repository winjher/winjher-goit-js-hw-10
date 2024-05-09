import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const breedsSelect = document.querySelector(".breed-select");
const loadingItem = document.querySelector(".loader");
const errorItem = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

breedsSelect.style.visibility = "hidden";
errorItem.style.visibility = "hidden";
catInfo.style.visibility = "hiddden";
fetchBreeds()
  .then((response) => {
    loadingItem.style.visibility = "hidden";
    breedsSelect.style.visibility = "visible";

    const cats = response.data;
    for (const cat of cats) {
      const option = document.createElement("option");
      option.value = cat.id;
      option.innerHTML = cat.name;
      breedsSelect.appendChild(option);
    }
  })
  .catch(() => {
    loadingItem.style.visibility = "hidden";
    errorItem.style.visibility = "visibile";
  });

breedsSelect.addEventListener("change", () => {
  const selectedId = breedsSelect.options[breedsSelect.selectedIndex].value;
  catInfo.style.visibility = "hidden";
  loadingItem.style.visibility = "visible";
  fetchCatByBreed(selectedId)
    .then((response) => {
      loadingItem.style.visibility = "hidden";
      catInfo.style.visibility = "visible";

      const cat = response.data[0].breeds[0];
      const imageUrl = response.data[0].url;
      catInfo.innerHTML = "";
      const list = document.createElement("ul");
      list.style = "list-style: none; display: flex;";
      const imageLi = document.createElement("li");
      const contentLi = document.createElement("li");
      contentLi.style = "padding-left: 20px; padding-right: 20px;";
      const image = document.createElement("img");
      image.src = imageUrl;
      image.style = "width: 500px; height: 500px;";
      image.alt = "Image cannot be loaded";
      imageLi.appendChild(image);

      const nameParagrahph = document.createElement("h1");
      nameParagrahph.innerHTML = cat.name;

      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.innerHTML = cat.description;

      const temperamentParagraph = document.createElement("p");
      temperamentParagraph.innerHTML = `<b>Temperament</b>: ${cat.temperament}`;
      contentLi.appendChild(nameParagrahph);
      contentLi.appendChild(descriptionParagraph);
      contentLi.appendChild(temperamentParagraph);

      list.appendChild(imageLi);
      list.appendChild(contentLi);

      catInfo.appendChild(list);
    })
    .catch(() => {
      loadingItem.style.visibility = "hidden";
      errorItem.style.visibility = "visible";
    });
});