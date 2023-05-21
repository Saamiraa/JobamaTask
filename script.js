const form = document.querySelector('form')
const titleInput = document.querySelector(".titleInput")
const locationInput = document.querySelector(".locationInput")
const container = document.querySelector(".container")
const data = {};
let queryString = null;
let mainUrl = "https://jabama-devjobs-api.vercel.app/api/v1/jobs"

function checkQuery(x) {
    if(x) {
        return `${mainUrl}?${queryString}`
    }
    else{
        return mainUrl
    }
}


document.addEventListener("DOMContentLoaded", showitems)


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
        for (const [key, value] of formData.entries()) {
    data[key] = value;
}
Object.keys(data).map(key =>{
    if(data[key]) {
        return
    }
    else {
        delete data[key]
    }
});
queryString = new URLSearchParams(data).toString();


if(Object.keys(data).length === 0){
    return window.history.pushState({ data }, '', '/');

}else{
    return window.history.pushState({ data }, '', `?${queryString}`);

}

showitems()
})


async function showitems() {
    const response = await fetch(checkQuery(queryString));
    const jsonData = await response.json();
    jsonData.result.items.forEach(user => {
        return createUser(user)
    })
    console.log(jsonData);
}


function createUser(user) {
    const containerCard = document.createElement("div");
    containerCard.className = "container-Card"
    containerCard.innerHTML = `
        <div class="container-Card__logo">
            <img src="${user.logo}" alt="logo">
        </div>
        <div class="container-Card__header">
            <p class="container-Card__header-time">${user.postedAt}</p>
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
    `
    container.appendChild(containerCard)
}

