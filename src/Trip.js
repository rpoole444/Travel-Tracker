class Trip {
  constructor(trips) {
    this.date = trips.date //etc....
  }

  getTripsByID(id) {
    const tripsByID = this.trips.filter(trip => trip.userID === id)
    return tripsByID
  }
}
module.exports = Trip;
