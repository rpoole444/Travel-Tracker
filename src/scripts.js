// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import Traveler from "../src/traveler";
import Destinations from "../src/Destinations";
import Trip from "../src/Trip";
import apiCalls from "../src/apiCalls";
const dayjs = require("dayjs");
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
// DOM RELATED, FETCH, POST,

const greeting = document.querySelector(".greeting");
const upcomingTrips = document.querySelector(".upcoming-trips");
// const presentTrips = document.querySelector(".present-trips")
const pastTrips = document.querySelector(".past-trips");
const yearlyCost = document.querySelector(".total-spent-ty");
const tripForm = document.querySelector(".input-field");
const destinationDropDown = document.querySelector("#destinationsDD");
const lengthOfTripInput = document.querySelector("#lengthInput");
const numberOfTravelersInput = document.querySelector("#travelersInput");
const departureDateInput = document.querySelector("#departureDate");
const estimateTripButton = document.querySelector(".submit-button");
const errorMessage = document.querySelector(".error-message");

const buyButton = document.querySelector(".buy-button");
const totalCostDisplay = document.querySelector(".total-cost-display");
const loginButton = document.querySelector("loginbutton");

// event listener loginbutton click handleLogin
// if emailInput.value && pasweedInput.value
let user;
let traveler;
let travelerData;
let trips;
let tripData;
let destinations;
let destinationData;
let postID;
let currentTripEntry;

apiCalls.fetchAllData().then((data) => {
  travelerData = data[0].travelers;
  tripData = data[1].trips;
  destinationData = data[2].destinations;
  postID = data[1].trips.length + 1;
  loadPageFunctions();
});

const updateDataModel = () => {
  newTravelerInstances();
  newTrips();
  newDestinations();
};

const renderPage = (trips, destinations) => {
  greetUser();
  populateTripChoice();
  displaySpentThisYear(trips, destinations);
  displayTrips();
  handleButtons();
};

const loadPageFunctions = () => {
  //show login page
  //check password and login status
  // if wrong info send errors for wrong username and password
  //1. hideLoginPage()
  //2.  getUserByLoginID
  updateDataModel();
  renderPage(traveler.trips, destinationData);
};

// const getRandomIndex = (array) => {
//   return Math.floor(Math.random() * array.length);
// }

// const getRandomUser = () => {
//   return travelerData[getRandomIndex(travelerData)];
// }

const newTravelerInstances = () => {
  traveler = new Traveler(travelerData[4], tripData); //travelerData[0] - replaced with the user who logs in .find
};

const newTrips = () => (trips = new Trip(tripData));

const newDestinations = () =>
  (destinations = new Destinations(destinationData));

const populateTripChoice = () => {
  destinations.destinations.forEach((place) => {
    destinationDropDown.innerHTML += `<option value="${place.id}">${place.destination}</option>`;
  });
};

const greetUser = () => {
  greeting.innerHTML = `Hi, ${traveler.findFirstName()}!`;
};

const displaySpentThisYear = (travelerTrips, destinationData) => {
  const amountSpent = traveler.totalYearlySpent(travelerTrips, destinationData);
  yearlyCost.innerText = `$${amountSpent} spent this year so far`;
};

// getUserByLogin()
const displayTrips = () => {
  const userUpcomingTrips = traveler.getTripItinerary("upcoming");
  const userPastTrips = traveler.getTripItinerary("past");

  upcomingTrips.innerHTML = "";
  pastTrips.innerHTML = "";
  userUpcomingTrips.forEach((trip) => {
    const userDestination = destinations.getDestinationById(trip.destinationID);

    upcomingTrips.innerHTML += `
    <article class="location-card">
        <img src="${userDestination.image}" alt="${
      userDestination.alt
    }" class="location-img">
          <div>
            <p class="location">${userDestination.destination}</p>
            <p class="date">${dayjs(trip.date).format("MM/DD/YY")}</p>
            <p class="travel-num">${trip.travelers} travelers</p>
            <p class="status">${trip.status}...</p>
          </div>
    </article>`;
  });
  userPastTrips.forEach((trip) => {
    const userDestination = destinations.getDestinationById(trip.destinationID);
    pastTrips.innerHTML += `
      <article class="location-card">
          <img src="${userDestination.image}" alt="${
      userDestination.alt
    }" class="location-img">
            <div>
              <p class="location">${userDestination.destination}</p>
              <p class="date">${dayjs(trip.date).format("MM/DD/YY")}</p>
              <p class="travel-num">${trip.travelers} travelers</p>
              <p class="status">${trip.status}!</p>
            </div>
      </article>`;
  });
};

function clearForm() {
  destinationDropDown.value = "";
  numberOfTravelersInput.value = "";
  departureDateInput.value = "";
  lengthOfTripInput.value = "";
}

const handleButtons = () => {
  buyButton.disabled = true;
  estimateTripButton.onclick = function () {
    totalCostDisplay.innerText = ``;
    if (
      destinationDropDown.value &&
      numberOfTravelersInput.value &&
      departureDateInput.value &&
      lengthOfTripInput.value &&
      estimateTripButton.innerText === "Estimate Trip"
    ) {
      buyButton.disabled = false;
      estimateTripButton.innerText = `Back`;
      totalCostDisplay.innerText = `$${traveler.getEstimatedCost(
        traveler.trips,
        destinationData,
        currentTripEntry
      )}`;
    } else if (
      !numberOfTravelersInput.value &&
      !departureDateInput.value &&
      !lengthOfTripInput.value &&
      estimateTripButton.innerText === "Estimate Trip"
    ) {
      buyButton.disabled = true;
      totalCostDisplay.innerText = `Please Fill Out Form for Estimate`;
      estimateTripButton.innerText === "Back";
    } else if (
      destinationDropDown.value &&
      numberOfTravelersInput.value &&
      departureDateInput.value &&
      lengthOfTripInput.value &&
      estimateTripButton.innerText === "Back"
    ) {
      clearForm();
      estimateTripButton.innerText = "Estimate Trip";
      buyButton.disabled = true;
    }
    buyButton.onclick = function () {
      totalCostDisplay.innerText = "";
      buyButton.disabled = true;
      estimateTripButton.disabled = false;
      clearForm();

      estimateTripButton.innerText = `Estimate Trip`;
    };
  };
};

//--------WIP GATHER EVENT LISTENER info------

function addNewTripData1(newDataEntry) {
  console.log("POST DATA:", newDataEntry);
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataEntry),
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      } else {
        apiCalls.fetchAllData().then((data) => {
          travelerData = data[0].travelers;
          tripData = data[1].trips;
          destinationData = data[2].destinations;
          postID = data[1].trips.length + 1;
          updateDataModel(data);
          renderPage(traveler.trips, destinationData);
          postID++;
          clearForm();
        });
      }
    })
    .catch((err) => {
      //update error message on DOM!
      //querySelect and innerText. the err.message
      errorMessage.innerText = err.message;
    });
}

function createUserTrip(event) {
  event.preventDefault();
  errorMessage.innerText = "";
  currentTripEntry = {
    id: Number(postID), //check into number() vs parseInt()
    userID: Number(traveler.id),
    destinationID: Number(destinationDropDown.value),
    travelers: Number(numberOfTravelersInput.value),
    date: dayjs(departureDateInput.value).format("YYYY/MM/DD"),
    duration: Number(lengthOfTripInput.value),
    status: "pending",
    suggestedActivities: [],
  };
}

const postNewTrip = () => {
  addNewTripData1(currentTripEntry);
};

estimateTripButton.addEventListener("click", createUserTrip);
buyButton.addEventListener("click", postNewTrip);
