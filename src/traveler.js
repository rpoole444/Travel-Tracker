const dayjs = require('dayjs')
class Traveler {
    constructor(travelerData, trips){
      this.id = travelerData.id
      this.name = travelerData.name
      this.trips = trips.filter(obj =>obj.userID === this.id)
    }


getTripItinerary(time) {
 const filteredTrip =this.trips.filter(trip => {
    if(time === "past"){
      return dayjs(trip.date).isBefore("2021/1/31")
    } else if(time === "upcoming"){
      return dayjs(trip.date).isAfter("2021/1/31")
    } else if(time === "pending"){
      return trip.status === "pending"
    }
  });
  // console.log(filteredTrip)
  return filteredTrip
}


totalYearlySpent(){
//need to calculate trom the trips data and include a tracel agents 10% fee
}
}


module.exports = Traveler