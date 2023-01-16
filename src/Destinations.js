class Destinations {
  constructor(destinations) {
    this.destinations = destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
module.exports = Destinations;
