"use strict";

  Toastify({
    text: "Git Hub Users API ga xush kelibsiz !",
    duration: 3500,
    gravity: "top",
    position: "center",
    close: true,
    style: {
      background: "linear-gradient(to right, black, black)",
      color: "red",
      border: "1px solid red",
      boxShadow: "0 0 12px rgba(255, 0, 0, 0.6)",
      fontWeight: "900",
      fontSize: "18px"
    }
  }).showToast();

  Toastify({
    text: "Assalomu alaykum",
    duration: 3500,
    gravity: "top",
    position: "center",
    close: true,
    style: {
      background: "linear-gradient(to right, black, black)",
      color: "green",
      border: "1px solid green",
      boxShadow: "0 0 12px rgba(0, 255, 0, 0.6)",
      fontWeight: "900",
      fontSize: "18px"
    }
  }).showToast();

const api = `https://api.github.com/users/`;
const searchInput = document.querySelector(".intro__search__input");
const elBtn = document.querySelector(".intro__btn");
const cards = document.querySelector(".cards");
const loading = document.querySelector(".loading");

function getUser(username) {
  loading.style.display = "flex";
  cards.querySelectorAll(".card, .not__found").forEach(elements => elements.remove());

  fetch(api + username)
    .then(response => {
      if (!response.ok) {
        throw new Error("User topilmadi");
      }
      return response.json();
    })
    .then(data => {
      loading.style.display = "none";
      showUser(data);
    })
 .catch(error => {
  console.error(error);
  loading.style.display = "none";
  cards.innerHTML = `<h2 class="not__found"> User topilmadi ❌ </h2>`;

    Toastify({
      text: "User topilmadi ❌",
      duration: 3500,
      gravity: "top",
      position: "center",
      close: true,
      style: {
        background: "linear-gradient(to right, black, black)",
        color: "red",
        border: "1px solid red",
        boxShadow: "0 0 12px rgba(255, 0, 0, 0.6)",
        fontWeight: "900",
        fontSize: "18px"
      }
    }).showToast();  
  });
}

elBtn.addEventListener("click", () => {
  const username = searchInput.value.trim();

  if (!username) {
    Toastify({
      text: "Username kiriting!",
      duration: 3500,
      gravity: "top",
      position: "center",
      close: true,
      style: {
        background: "linear-gradient(to right, black, black)",
        color: "red",
        border: "1px solid red",
        boxShadow: "0 0 12px rgba(255, 0, 0, 0.6)",
        fontWeight: "900",
        fontSize: "18px"
      }
    }).showToast();

    return;
  }
    getUser(username);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    elBtn.click(); 
  }
});

function showUser(user) {
  cards.innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" width="120" style="border-radius:50%">
      <h2 class="username"> Username: ${user.login} </h2>
      <p class="followers"> Followers: ${user.followers} </p>
      <p class="followers"> Following: ${user.following} </p>
      <p class="repository"> Repository: ${user.public_repos} </p>
      <a class="gitHub__profile" href="${user.html_url}" target="_blank"> Visit GitHub profile </a>
    </div> <!-- card -->
  `; 
}