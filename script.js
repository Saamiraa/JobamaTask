const form = document.querySelector("form");
const titleInput = document.querySelector(".titleInput");
const locationInput = document.querySelector(".locationInput");
const container = document.querySelector(".container");
const containerBox = document.querySelector(".containerBox");
const Lodingbtn = document.querySelector("#Lodingbtn");

const data = {};
let queryString = null;
let mainUrl = "https://jabama-devjobs-api.vercel.app/api/v1/jobs";

function checkQuery(x) {
  if (x) {
    return `${mainUrl}?${queryString}&limit=9&page=${page}`;
  } else {
    return `${mainUrl}?limit=9&page=${page}`;
  }
}

document.addEventListener("DOMContentLoaded", showitems);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  Object.keys(data).map((key) => {
    if (data[key]) {
      return;
    } else {
      delete data[key];
    }
  });

  queryString = new URLSearchParams(data).toString();

  if (Object.keys(data).length === 0) {
    window.history.pushState({ data }, "", "/");
  } else {
    window.history.pushState({ data }, "", `?${queryString}`);
  }
  page = 1;
  showitems(false);
});

async function showitems(isloadmore) {
  if (!isloadmore) {
    containerBox.innerHTML = "";
  }
  const response = await fetch(checkQuery(queryString));
  const jsonData = await response.json();
  jsonData.result.items.forEach((user) => {
    return createUser(user);
  });
  if (jsonData.result.items.length > 0) {
    page++;
  }
  console.log(jsonData);
}

let page = 1;
Lodingbtn.addEventListener("click", function () {
  showitems(true);
});

function createUser(user) {
  const containerCard = document.createElement("div");
  containerCard.className = "container-Card";
  containerCard.innerHTML = `
        <div class="container-Card__logo">
            <img src="${user.logo}" alt="logo">
        </div>
        <div class="container-Card__header">
            <p class="container-Card__header-time">${timeSince(new Date(user.postedAt))}</p>
            <p class="container-Card__header-stats">${user.contract}</p>
        </div>
        <div class="container-Card__title">
            <span>${user.position}</span>
        </div>
        <div class="container-Card__ComanyName">
            <span>${user.company}</span>
        </div>
        <div class="container-Card__location">
            <span>${user.location}</span>
        </div>
        <div class="container-Card__apply">
            <button>Apply!</button>
        </div>
    `;
  containerBox.appendChild(containerCard);
}



function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

