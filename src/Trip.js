class Trip {
  constructor(trips) {
    this.trips = trips
  }

  getTripsByID(id) {
    const tripsByID = this.trips.filter(trip => trip.userID === id)
    return tripsByID
  }
}
module.exports = Trip;