// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import Traveler from '../src/traveler';
import Destinations from '../src/Destinations';
import Trip from '../src/Trip'
import apiCalls from '../src/apiCalls';
const dayjs = require("dayjs")
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
// DOM RELATED, FETCH, POST, 

const greeting = document.querySelector(".greeting")
const upcomingTrips = document.querySelector(".upcoming-trips")
const presentTrips = document.querySelector(".present-trips")
const pastTrips = document.querySelector(".past-trips")
const yearlyCost = document.querySelector(".total-spent-ty")
const tripForm = document.querySelector(".input-field")
const destinationInput = document.getElementById("destinations-dd")
const tripLengthInput = document.getElementById("length")
const amountOfTravelersInput = document.getElementById("travelers")
const departureDateInput = document.getElementById("departure")
const submitButton = document.querySelector(".sumbit-button")
const loginButton = document.querySelector
("loginbutton")


// event listener loginbutton click handleLogin
// if emailInput.value && pasweedInput.value
let user
let traveler;
let travelerData;
let trips;
let tripData;
let destinations;
let destinationData;

apiCalls.fetchAllData().then(data => {
  travelerData = data[0].travelers
  tripData = data[1].trips
  destinationData = data[2].destinations
  loadPageFunctions()
});

const loadPageFunctions = () => {
  //show login page
  //check password and login status
  // if wrong info send errors for wrong username and password
  //1. hideLoginPage()
  //2. GetRandomUser() or getUserByLoginID
  // getRandomUser()
  newTravelerInstances()
  newTrips()
  newDestinations()
  greetUser()
  displayTrips()
  displaySpentThisYear() 
  populateTripChoice()
  
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const getRandomUser = () => {
  return travelerData[getRandomIndex(travelerData)];
}

const newTravelerInstances = () => {
  traveler = new Traveler(getRandomUser(), tripData)//travelerData[0] - replaced with the user who logs in .find
}

const newTrips = () => (trips = new Trip(tripData))

const newDestinations = () => (destinations = new Destinations(destinationData))

const populateTripChoice = () => {
destinations.destinations.forEach(place => {
  destinationInput.innerHTML += `<option>${place.destination}</option>`
})
  }

const greetUser = () => {
  greeting.innerHTML = `Hi, ${traveler.findFirstName()}!` 
}

const displaySpentThisYear = () =>{
    //  destinations.getDestinationById(trip.destinationID)
    const amountSpent = traveler.totalYearlySpent(traveler.trips,destinations)
    yearlyCost.innerText = `$${amountSpent} spent this year so far`
  }

// getUserByLogin()
const displayTrips = () => {
  const userUpcomingTrips = traveler.getTripItinerary("upcoming")
  const userPastTrips = traveler.getTripItinerary("past")
  userUpcomingTrips.forEach(trip => {
    const userDestination = destinations.getDestinationById(trip.destinationID)

    upcomingTrips.innerHTML += `
    <article class="location-card">
                <img src="${userDestination.image}"class="location-img">
                  <div>
                    <p class="location">${userDestination.destination}</p>
                    <p class="date">${dayjs(trip.date).format("MM/DD/YY")}</p>
                    <p class="travel-num">${trip.travelers} travelers</p>
                  </div>
                </div>
                <p>${trip.status}!!</p>
            </article>`
  })
  userPastTrips.forEach(trip => {
      const userDestination = destinations.getDestinationById(trip.destinationID)
      pastTrips.innerHTML += `
      <article class="location-card">
                  <img src="${userDestination.image}"class="location-img">
                    <div>
                      <p class="location">${userDestination.destination}</p>
                      <p class="date">${dayjs(trip.date).format("MM/DD/YY")}</p>
                      <p class="travel-num">${trip.travelers} travelers</p>
                    </div>
                  </div>
                  <p>${trip.status}!!</p>
              </article>`
  })
}

const fetchApiUrl = (path) => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
    .then((response) => response.json())
    .then(data => data)
    .then((error) => console.log(`${path} error`, error))
}
function addNewTripData(newDataEntry) {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataEntry),
  })
    .then((res) => res.json())
    .then((data) => data)
    .then(() =>
      fetchApiUrl("trips")
        .then((trip) => (tripData = trip.trips))
        .then(() => {
          newTrips();
          displayTrips();
          displaySpentThisYear() 
        })
    )
    .catch((err) => console.log("Error!", err));
}

tripForm.addEventListener("submit", (e) => {
  console.log(e)
  e.preventDefault();
  const formData = new FormData(e.target);
  const newDataEntry = {
    id: Number(`${trips.id}`),
    userID: Number(`${trips.userID}`),
    travelers: Number(formData.get("travelers")),
    date: dayjs(formData.get("date")).format("YYYY/MM/DD"),
    duration: Number(formData.get("duration")),
    status: trips.status,
    suggetedActivities:[]
  };
  addNewTripData(newDataEntry);
  e.target.reset();
});