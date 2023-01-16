class Trip {
  constructor(trips) {
    this.trips = trips;
  }

  getTripsByID(id) {
    return this.trips.filter((trip) => trip.userID === id);
  }
}
module.exports = Trip;
