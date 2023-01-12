class Destinations {
  constructor(destinations){
    this.destinations = destinations
  }
  getDestinationById(id){
    const theDestination = this.destinations.find(destination => {
      return destination.id === id
    })
    return theDestination
  }
}
module.exports = Destinations
