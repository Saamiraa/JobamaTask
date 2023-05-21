const container = document.querySelector(".container")
const searchTitle = document.querySelector(".header-bottom__searchBar-form-title input")
const searchLocation = document.querySelector(".header-bottom__searchBar-form-location input")


document.addEventListener("DOMContentLoaded", showitems)

searchTitle.addEventListener("input", searchJobs)

// searchTitle.addEventListener("input", e => {
//     const value = e.target.value
//     console.log(value)
// })

// searchLocation.addEventListener("input", e => {
//     const value = e.target.value
//     console.log(value)
// })


function showitems() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'data.json', true)

    xhr.onload = function() {
        if(xhr.status == 200) {
            const response = JSON.parse(xhr.response);
            response.result.items.forEach(user => {
                createUser(user)
                // console.log(user)
            });
        }
    }
    xhr.send()
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



// async function searchJobs() {
//     const result = await fetch('data.json')
//     const data = await result.json();
//     const jobresult = data.result.items.filter(job => job.position.toLowerCase().includes(searchTitle.value))
//     createUser(jobresult)
// }

