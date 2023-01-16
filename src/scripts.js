import "./css/styles.css";
import Traveler from "../src/traveler";
import Destinations from "../src/Destinations";
import Trip from "../src/Trip";
import apiCalls from "../src/apiCalls";
const dayjs = require("dayjs");

// ---------------------querySelectors---------------------------------

const header = document.querySelector(".header");
const main = document.querySelector(".main");
const greeting = document.querySelector(".greeting");
const date = document.querySelector(".today");
const upcomingTrips = document.querySelector(".upcoming-trips");
const pastTrips = document.querySelector(".past-trips");
const totalCostDisplay = document.querySelector(".total-cost-display");
const yearlyCost = document.querySelector(".total-spent-ty");
const destinationDropDown = document.querySelector("#destinationsDD");
const lengthOfTripInput = document.querySelector("#lengthInput");
const numberOfTravelersInput = document.querySelector("#travelersInput");
const departureDateInput = document.querySelector("#departureDate");
const estimateTripButton = document.querySelector(".submit-button");
const logoutButton = document.querySelector(".logout-button");
const loginButton = document.querySelector(".login-submit");
const buyButton = document.querySelector(".buy-button");
const errorMessage = document.querySelector(".error-message");
const loginError = document.querySelector(".login-error");
const loginPage = document.querySelector(".login");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");

// --------------------------global variables----------------------------

let traveler;
let travelerData;
let trips;
let tripData;
let destinations;
let destinationData;
let postID;
let currentTripEntry;

// -----------------------apiCalls/fetch----------------------------------------

apiCalls.fetchAllData().then((data) => {
  travelerData = data[0].travelers;
  tripData = data[1].trips;
  destinationData = data[2].destinations;
  postID = data[1].trips.length + 1;
  loadPageFunctions();
});

// ------------------load and update functions--------------------------------------

const updateDataModel = (traveler, trips) => {
  newTravelerInstances(traveler, trips);
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
  handleLoginButton();
  validateLogin();
};

// -----------------------Login functions-----------------------------

function validateLogin() {
  const ID = Number(emailInput.value.match(/[0-9]+/g)[0]);
  console.log(ID);
  loginButton.onclick = function () {
    if (
      ID >= 1 &&
      ID <= 50 &&
      emailInput.value === `traveler${ID}` &&
      passwordInput.value === "travel"
    ) {
      traveler = travelerData.find((traveler) => traveler.id === ID);
      updateDataModel(traveler, tripData);
      renderPage(traveler.trips, destinationData);
      loginPage.classList.add("hidden");
      header.classList.remove("hidden");
      main.classList.remove("hidden");
    } else {
      loginError.innerText = "Sorry Wrong Information, Please Try Again";
      setTimeout(function () {
        clearLoginError();
      }, 3000);
    }
  };
}

function handleLoginButton() {
  if (!emailInput.value && !passwordInput.value) {
    loginButton.onclick = function () {
      loginError.innerText = "please try again!";
      loginButton.disabled = true;
      setTimeout(function () {
        clearLoginError();
      }, 3000);
    };
  }
}

function clearLoginError() {
  emailInput.value = "";
  passwordInput.value = "";
  loginError.innerText = "";
  loginButton.disabled = false;
}

function clearError() {
  totalCostDisplay.innerText = "";
}

function backToLogin() {
  emailInput.value = "";
  passwordInput.value = "";
  loginError.innerText = "";
  loginPage.classList.remove("hidden");
  header.classList.add("hidden");
  main.classList.add("hidden");
}
//-----------------Data Model functions---------------------

const newTravelerInstances = (travelerInfo, trips) => {
  traveler = new Traveler(travelerInfo, trips);
};

const newTrips = () => (trips = new Trip(tripData));

const newDestinations = () =>
  (destinations = new Destinations(destinationData));

const displaySpentThisYear = (travelerTrips, destinationData) => {
  const amountSpent = traveler.totalYearlySpent(travelerTrips, destinationData);
  yearlyCost.innerText = `$${amountSpent} spent this year so far`;
};

// -----------DOM Related Functions -----------------------

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
          <div class="card-info">
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
            <div class="card-info">
              <p class="location">${userDestination.destination}</p>
              <p class="date">${dayjs(trip.date).format("MM/DD/YY")}</p>
              <p class="travel-num">${trip.travelers} travelers</p>
              <p class="status">${trip.status}!</p>
            </div>
      </article>`;
  });
};

const populateTripChoice = () => {
  destinations.destinations.forEach((place) => {
    destinationDropDown.innerHTML += `<option value="${place.id}">${place.destination}</option>`;
  });
};

const greetUser = () => {
  greeting.innerHTML = `Hi, ${traveler.findFirstName()}!`;
  date.innerText = `Today is ${dayjs("2022/12/31").format("MM/DD/YYYY")}`;
  departureDateInput.innerHTML = `<input
      type="date"
      name="departure-date"
      id="departureDate"
      class="departure-date"
      min="${dayjs("2022/12/31").format("MM/DD/YYYY")}"
    />`;
};

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
      lengthOfTripInput.disabled = true;
      departureDateInput.disabled = true;
      destinationDropDown.disabled = true;
      numberOfTravelersInput.disabled = true;
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
      lengthOfTripInput.disabled = false;
      departureDateInput.disabled = false;
      destinationDropDown.disabled = false;
      numberOfTravelersInput.disabled = false;
      buyButton.disabled = true;
      totalCostDisplay.innerText = `Please Fill Out Form for Estimate`;
      setTimeout(function () {
        clearError();
      }, 2000);
      estimateTripButton.innerText === "Back";
    } else if (
      destinationDropDown.value &&
      numberOfTravelersInput.value &&
      departureDateInput.value &&
      lengthOfTripInput.value &&
      estimateTripButton.innerText === "Back"
    ) {
      lengthOfTripInput.disabled = false;
      departureDateInput.disabled = false;
      destinationDropDown.disabled = false;
      numberOfTravelersInput.disabled = false;
      clearForm();
      estimateTripButton.innerText = "Estimate Trip";
      buyButton.disabled = true;
    }
    buyButton.onclick = function () {
      totalCostDisplay.innerText = "";
      lengthOfTripInput.disabled = false;
      departureDateInput.disabled = false;
      destinationDropDown.disabled = false;
      numberOfTravelersInput.disabled = false;
      buyButton.disabled = true;
      estimateTripButton.disabled = false;
      totalCostDisplay.innerText = "You're Booked, Bon Voyage!!";
      estimateTripButton.innerText = `Estimate Trip`;
      clearForm();
    };
  };
};

function clearForm() {
  destinationDropDown.value = "";
  numberOfTravelersInput.value = "";
  departureDateInput.value = "";
  lengthOfTripInput.value = "";
  setTimeout(function () {
    totalCostDisplay.innerText = "";
  }, 3000);
}

//----------POST REQUEST and UPDATE DATA-------------

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
          updateDataModel(traveler, tripData);
          renderPage(traveler.trips, destinationData);
          postID++;
          clearForm();
        });
      }
    })
    .catch((err) => {
      errorMessage.innerText = err.message;
    });
}

function createUserTrip(event) {
  event.preventDefault();
  errorMessage.innerText = "";
  currentTripEntry = {
    id: Number(postID),
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

// ----------------------Event Listeners-----------------

estimateTripButton.addEventListener("click", createUserTrip);
buyButton.addEventListener("click", postNewTrip);
loginButton.addEventListener("click", validateLogin);
logoutButton.addEventListener("click", backToLogin);
