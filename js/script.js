// const formDiv = document.querySelector('.search-container');
const galleryContent = document.getElementById('gallery');
const bodyContent = document.querySelector('body');
let cards = document.querySelectorAll('.card');
const containerDiv = document.createElement('DIV');
const next = document.getElementById("modal-next");
const prev = document.getElementById("modal-prev");
let searchInput;

function fetchData(URL) { //reusable fetch function, parses user information to JSON
    return fetch(URL)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('404 there was a problem!', error))
}

fetchData("https://randomuser.me/api/?nat=US&results=12")//fetch data from the random user generator API

    .then(user => {
        generateGallery(user.results);
        eventListener(user.results);

    });

function checkStatus(response) {//checks status of promise and returns response
    if(response.ok) {
        return Promise.resolve(response);
    }

    else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateGallery(user) {//generates and displays users
    const galleryDiv = user.map(person => {
        return `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${person.picture.large} alt="Profile Picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>`
    });

    gallery.innerHTML += galleryDiv.join('');
}

function generateModal(user, i) {//generates and dsplays user modal
    const originalDOB = new Date(user[i].dob.date);
    console.log(originalDOB);
    const formattedDOB = originalDOB.toLocaleDateString();

    let html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${user[i].picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${user[i].name.first} ${user[i].name.last}</h3>
                <p class="modal-text">${user[i].email}</p>
                <p class="modal-text cap">${user[i].location.city}</p>
                <hr>
                <p class="modal-text">${user[i].phone}</p>
                <p class="modal-text">${user[i].location.street.number} ${user[i].location.street.name}, ${user[i].location.city}, ${user[i].location.state} ${user[i].location.postcode}</p>
                <p class="modal-text">Birthday ${formattedDOB}</p>
            </div>
        </div>
    </div>
    `;

    containerDiv.innerHTML += html;
    bodyContent.appendChild(containerDiv);

}

function eventListener(user) { //function iterates through users cards, when clicked modal function is called and appends modal to body
    //close modal function called to close modal when X button is clicked

let cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
cards[i].addEventListener('click', () => {
generateModal(user, i);
closeModal();
})

}

}

function closeModal() { //function when called will close modal when X button is clicked
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener('click', () => {
        containerDiv.remove();
    })
}