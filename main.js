const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw";

const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?&api_key=live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw";

const spanError = document.getElementById("error");

async function getRandomCats() {
  try {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    console.log("Random");
    console.log(data);

    if (res.status != 200) {
      spanError.innerHTML = "There was a mistake: " + res.status;
    } else {
      const img1 = document.getElementById("img1");
      const img2 = document.getElementById("img2");
      const img3 = document.getElementById("img3");
      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url;
    }
  } catch (error) {
    console.log(error);
  }
}
getRandomCats();

function reloadApp() {
  location.reload();
}

async function getFavoriteCats() {
  try {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();

    console.log("Favorite");
    console.log(data);

    if (res.status != 200) {
      spanError.innerHTML = "There was a mistake: " + res.status + data.message;
    }
  } catch (error) {
    console.log(error);
  }
}
getFavoriteCats();

async function saveFavoriteCats() {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: "MTUwMDE5MA",
    }),
  });
  const data = await res.json();

  console.log("Save");
  console.log(res);

  if (res.status != 200) {
    spanError.innerHTML = "There was a mistake: " + res.status;
  }
}
