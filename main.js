const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

api.defaults.headers.common["X-API-KEY"] =
  "live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw";

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3";

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";

const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

const spanError = document.getElementById("error");

async function getRandomCats() {
  try {
    const res = await fetch(API_URL_RANDOM, {
      method: "GET",
      headers: {
        "X-API-KEY":
          "live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw",
      },
    });
    const data = await res.json();

    console.log("Random");
    console.log(data);

    if (res.status != 200) {
      spanError.innerHTML = "There was a mistake: " + res.status;
    } else {
      const img1 = document.getElementById("img1");
      const img2 = document.getElementById("img2");
      const img3 = document.getElementById("img3");
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");
      const btn3 = document.getElementById("btn3");

      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url;

      btn1.onclick = () => saveFavoriteCat(data[0].id);
      btn2.onclick = () => saveFavoriteCat(data[1].id);
      btn3.onclick = () => saveFavoriteCat(data[2].id);
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
    const res = await fetch(API_URL_FAVORITES, {
      method: "GET",
      headers: {
        "X-API-KEY":
          "live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw",
      },
    });
    const data = await res.json();

    console.log("Favorite");
    console.log(data);

    if (res.status != 200) {
      spanError.innerHTML = "There was a mistake: " + res.status + data.message;
    } else {
      data.forEach((kitten) => {
        const section = document.getElementById("favoritesCats");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const btn = document.createElement("button");
        const btnText = document.createTextNode("Remove to favorites");
        const container = document.createElement("div");

        img.src = kitten.image.url;
        img.classList.add("img-photo");
        btn.appendChild(btnText);
        btn.classList.add("button-photo");
        btn.onclick = () => deleteFavoriteCat(kitten.id);
        container.classList.add("container");

        article.appendChild(img);
        container.appendChild(btn);
        article.appendChild(container);
        section.appendChild(article);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
getFavoriteCats();

async function saveFavoriteCat(id) {
  const { data, status } = await api.post("/favourites", {
    image_id: id,
  });

  // const res = await fetch(API_URL_FAVORITES, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-API-KEY":
  //       "live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw",
  //   },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });
  // const data = await res.json();

  if (status != 200) {
    spanError.innerHTML = "There was a mistake: " + status;
  } else {
    console.log("Saved cat");
    reloadApp();
  }
}

async function deleteFavoriteCat(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY":
        "live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw",
    },
  });
  const data = await res.json();

  if (res.status != 200) {
    spanError.innerHTML = "There was a mistake: " + res.status;
  } else {
    console.log("Removed cat");
    reloadApp();
  }
}

async function uploadCatPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);

  console.log(formData.get("file"));
  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      "X-API-KEY":
        "live_3HtJzwaOwPebbHgkty8tBfHw7SUqRqOjtoOciTWhWTmWRP0C6sspe1c7XbFwewdw",
    },
    body: formData,
  });
  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`;
  } else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavoriteCat(data.id);
  }
}
