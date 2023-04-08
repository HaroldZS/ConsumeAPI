const URL = "https://api.thecatapi.com/v1/images/search";

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const img = document.querySelector("img");
    img.src = data[0].url;
  });

// async function getImage() {
//   try {
//     const response = await fetch(URL);
//     const data = await response.json();
//     const img = document.querySelector("img");
//     img.src = data[0].url;
//   } catch (error) {
//     console.log(error);
//   }
// }

// getImage();

function randomCat() {
  location.reload();
}
