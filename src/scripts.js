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
// const presentTrips = document.querySelector(".present-trips")
const pastTrips = document.querySelector(".past-trips")
const yearlyCost = document.querySelector(".total-spent-ty")
const tripForm = document.querySelector(".input-field")
const destinationDropDown = document.querySelector('#destinationsDD');
const lengthOfTripInput = document.querySelector('#lengthInput');
const numberOfTravelersInput = document.querySelector('#travelersInput');
const departureDateInput = document.querySelector('#departureDate')
const estimateTripButton = document.querySelector('.submit-button');


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
let postID;
let currentTripEntry

apiCalls.fetchAllData().then(data => {
  travelerData = data[0].travelers
  tripData = data[1].trips
  destinationData = data[2].destinations
  postID = data[1].trips.length + 1
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
  destinationDropDown.innerHTML += `<option value="${place.id}">${place.destination}</option>`
})// add a value attribute assign the value to destinationID ##
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
//--------WIP GATHER EVENT LISTENER info------

function createUserTrip(event){
  event.preventDefault()
  currentTripEntry = {
    id: Number(postID),//check into number() vs parseInt()
    userID: Number(traveler.id),
    destinationID: Number(destinationDropDown.value),
    travelers: Number(numberOfTravelersInput.value),
    date: dayjs(departureDateInput.value).format('YYYY/MM/DD'),
    duration: Number(lengthOfTripInput.value),
    status: "pending",
    suggestedActivities: []
  }
 
  displaySpentThisYear()
  // console.log("POSTING TRIP", currentTripEntry)
  apiCalls.addNewTripData(currentTripEntry, "trips")
  .then(data => updateData(data))
  .then(() => {
    postID++
    clearForm()
  })
};

function clearForm() {
  destinationDropDown.value = ""
  numberOfTravelersInput.value = ""
  departureDateInput.value = ""
  lengthOfTripInput.value = ""
};

const updateData = () => {
  apiCalls.fetchAllData('trips')
    newTrips()
    displaySpentThisYear()
}

const getEstimatedCost = () => {
  return destinations.reduce((sum, place) => {
    if(place.id === currentTripEntry.destinationID){
      sum += (place.estimatedLodgingCostPerDay * currentTripEntry.duration) + (place.estimatedFlightCostPerPerson * currentTripEntry.travelers)
    }
    return sum
  }, 0)
}

estimateTripButton.addEventListener('click', createUserTrip);