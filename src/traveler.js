//"God CLas"
const dayjs = require('dayjs')
const destinationRepo = require('../src/destinationRepo')
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


totalYearlySpent(){
  const destination = destinationRepo.getDestinationById(num)
  console.log(destination)

    destinationRepo.destinations.forEach(location => {
      console.log(destination)
    this.trips.forEach(trip => {

 })
  })
// const tripbyId//need to calculate trom the trips data and include a tracel agents 10% fee
}
}


module.exports = Traveler, destinationRepo