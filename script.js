const container = document.getElementsByClassName("container");
document.addEventListener("DOMContentLoaded", showitems)

function showitems() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'data.json', true)

    xhr.onload = function() {
        if(xhr.status == 200) {
            const users = JSON.parse(xhr.response);
            users.forEach(user => {
                // createUser(user)
                console.log(user)
            });
        }
    }
    xhr.send()
}

// function createUser(user) {
//     const containerCard = document.createElement("div");
//     containerCard.classList("container-Card")
//     containerCard.innerHTML = `
//         <div class="container-Card__logo">
//             <img src="${user.logo}" alt="logo">
//         </div>
//         <div class="container-Card__header">
//             <p class="container-Card__header-time">${user.postedAt}</p>
//             <p class="container-Card__header-stats">${user.contract}</p>
//         </div>
//         <div class="container-Card__title">
//             <span>${user.position}</span>
//         </div>
//         <div class="container-Card__ComanyName">
//             <span>${user.company}</span>
//         </div>
//         <div class="container-Card__location">
//             <span>${user.location}</span>
//         </div>
//         <div class="container-Card__apply">
//             <button>Apply!</button>
//         </div>
//     `
//     container.appendChild(containerCard)
// }