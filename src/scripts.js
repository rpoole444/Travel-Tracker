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
  newInstances()
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

const newInstances = () => {
  traveler = new Traveler(getRandomUser(), tripData)//travelerData[0] - replaced with the user who logs in .find
  console.log(traveler)
  trips = new Trip(tripData)
  destinations = new Destinations(destinationData)
}

const populateTripChoice = () => {
console.log(destinations.destinations)
destinations.destinations.forEach(place => {
  destinationInput.innerHTML += `<option>${place.destination}</option>`
})
  }

const greetUser = () => {
  greeting.innerHTML = `Hi, ${traveler.findFirstName()}!` 
}

const displaySpentThisYear = () =>{
  traveler.trips.forEach(trip => {
    const userDestination = destinations.getDestinationById(trip.destinationID)
    const amountSpent = traveler.totalYearlySpent(traveler.trips,destinations)
   
    yearlyCost.innerText = `$${amountSpent} spent this year so far`
  })
}
// getUserByLogin()
const displayTrips = () => {
  const userUpcomingTrips = traveler.getTripItinerary("upcoming")
  const userPastTrips = traveler.getTripItinerary("past")
  userUpcomingTrips.forEach(trip => {
    const userDestination = destinations.getDestinationById(trip.destinationID)
    console.log("destination", userDestination)
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
}
