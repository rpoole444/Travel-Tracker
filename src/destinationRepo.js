class destinationRepo {
  constructor(destinations){
    this.destinations = destinations
  }
  getDestinationById(id){
    const theDestination = this.destinations.find(destination => {
      console.log(destination)
      return destination.id === id
    })
    return theDestination
  }
}
module.exports = destinationRepo
