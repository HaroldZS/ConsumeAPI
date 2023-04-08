const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw";

async function getImage() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");

    console.log(data);
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
  } catch (error) {
    console.log(error);
  }
}
getImage();

function randomCat() {
  location.reload();
}
