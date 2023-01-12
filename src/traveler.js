//"God CLas"
const dayjs = require('dayjs')
class Traveler {
    constructor(travelerData, trips){
      this.id = travelerData.id
      this.name = travelerData.name
      this.trips = trips.filter(obj =>obj.userID === this.id)
    }


getTripItinerary(time) {
 const filteredTrip = this.trips.filter(trip => {
    if(time === "past"){
      return dayjs(trip.date).isBefore("2021/1/31")
    }
    if(time === "upcoming"){
      return dayjs(trip.date).isAfter("2021/1/31")
    } 
  });
  // console.log(filteredTrip)
  return filteredTrip
}

checkPendingStatus(){
  const pendingTrips = this.trips.filter(trip => trip.status === "pending")
  return pendingTrips
}


totalYearlySpent(userTrips, destinations){
  let sum = 0
  userTrips.forEach(trip => {
     destinations.destinations.forEach(destination => {
      if(trip.destinationID === destination.id && trip.status === "approved"){
        sum += (destination.estimatedLodgingCostPerDay * trip.duration) + (destination.estimatedFlightCostPerPerson * trip.travelers)
      }
     })
    })
    let withBookingFee = sum * .10
    let answer = withBookingFee + sum
    return `$${answer}`
}
}


module.exports = Traveler