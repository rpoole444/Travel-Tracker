//"God Class"
const dayjs = require("dayjs");
class Traveler {
  constructor(travelerData, trips) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.trips = trips.filter((obj) => obj.userID === this.id);
  }

  findFirstName() {
    return this.name.split(" ")[0];
  }

  getTripItinerary(time) {
    const filteredTrip = this.trips.filter((trip) => {
      if (time === "past") {
        return dayjs(trip.date).isBefore("2022/12/31");
      }
      if (time === "upcoming") {
        return dayjs(trip.date).isAfter("2022/12/31");
      }
    });
    return filteredTrip;
  }

  checkPendingStatus() {
    const pendingTrips = this.trips.filter((trip) => trip.status === "pending");
    return pendingTrips;
  }

  totalYearlySpent(userTrips, destinations) {
    console.log(userTrips);
    const tripsThisYear = userTrips.filter(
      (trip) =>
        dayjs(trip.date).isBefore(dayjs().endOf("year")) &&
        dayjs(trip.date).isAfter(dayjs().startOf("year"))
    );

    const costInAYear = tripsThisYear.reduce((sum, trip) => {
      destinations.forEach((place) => {
        if (place.id === trip.destinationID) {
          sum +=
            place.estimatedLodgingCostPerDay * trip.duration +
            place.estimatedFlightCostPerPerson * trip.travelers;
        }
      });
      return sum;
    }, 0);
    const withBookingFee = costInAYear * 0.1;
    const Total = withBookingFee + costInAYear;
    return Total.toFixed(2);
  }

  getEstimatedCost(userTrips, destinations, currentTripEntry) {
    return destinations.reduce((sum, place) => {
      if (place.id === currentTripEntry.destinationID) {
        sum +=
          place.estimatedLodgingCostPerDay * currentTripEntry.duration +
          place.estimatedFlightCostPerPerson * currentTripEntry.travelers;
      }
      return sum;
    }, 0);
  }
}

module.exports = Traveler;
