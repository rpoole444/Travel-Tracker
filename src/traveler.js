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
        return dayjs(trip.date).isBefore("2021/1/31");
      }
      if (time === "upcoming") {
        return dayjs(trip.date).isAfter("2021/1/31");
      }
    });
    return filteredTrip;
  }

  checkPendingStatus() {
    const pendingTrips = this.trips.filter((trip) => trip.status === "pending");
    return pendingTrips;
  }

  totalYearlySpent(userTrips, destinations) {
    let sum = 0;
    userTrips.forEach((trip) => {
      destinations.destinations.forEach((destination) => {
        if (
          trip.destinationID === destination.id &&
          trip.status === "approved"
        ) {
          sum +=
            destination.estimatedLodgingCostPerDay * trip.duration +
            destination.estimatedFlightCostPerPerson * trip.travelers;
        }
      });
    });
    const withBookingFee = sum * 0.1;
    return withBookingFee + sum;
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
//duration and travelers
// estimatedLodgingCostPerDay: 100,
// estimatedFlightCostPerPerson: 780
// totalYearlySpent(userTrips, destinations){
//   // console.log(this.getTripItinerary("past"))
//   // const pastTrips = this.getTripItinerary("past")
//   const travelerTripsThisYear = pastTrips.filter(trip => dayjs(trip.date).isAfter([dayjs("2021/1/31").subtract(1, 'year')], 'year'));
//   console.log(travelerTripsThisYear)
//   let sum = 0
//   travelerTripsThisYear.forEach(trip => {
//      destinations.destinations.forEach(destination => {
//       if(trip.destinationID === destination.id && trip.status === "approved"){
//         sum += (destination.estimatedLodgingCostPerDay * trip.duration) + (destination.estimatedFlightCostPerPerson * trip.travelers)
//       }
//      })
//     })
//     const withBookingFee = sum * .10
//     return withBookingFee + sum
// }

module.exports = Traveler;
