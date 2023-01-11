const { expect } = require("chai");
const Traveler = require("../src/Traveler")
// const Trip = require("../src/Trip")

  describe("traveler", () => {
    let trip1;
    let trip2;
    let trip3;
    let trip4;
    let trip5;
    let traveler;
    let travelerData;
    let travelerTrips;
    let destinations;
    let destination1;
    let destination2;
    let destination3;
    let destination4;
    let destination5;

    beforeEach(() => {
      trip1 = {
          id: 1,
          userID: 44,
          destinationID: 49,
          travelers: 1,
          date: "2022/09/16",
          duration: 8,
          status: "approved",
        };
        
        destination1 = {
          id: 49,
          destination: "Castries, St Lucia",
          estimatedLodgingCostPerDay: 650,
          estimatedFlightCostPerPerson: 90,
        };

       trip2 = {
          id: 46,
          userID: 44,
          destinationID: 33,
          travelers: 2,
          date: "2020/08/24",
          duration: 11,
          status: "approved",
        };
        
        destination2 ={
          id: 33,
          destination: "Brussels, Belgium",
          estimatedLodgingCostPerDay: 1000,
          estimatedFlightCostPerPerson: 110,
        };

       trip3 = {
          id: 48,
          userID: 44,
          destinationID: 22,
          travelers: 6,
          date: "2021/02/10",
          duration: 8,
          status: "approved",
       };

       destination3 = {
         id: 22,
         destination: "Rome, Italy",
         estimatedLodgingCostPerDay: 90,
         estimatedFlightCostPerPerson: 650,
       };
       
       trip4 = {
         id: 48,
         userID: 4,
         destinationID: 11,
         travelers: 6,
         date: "2021/02/10",
         duration: 8,
         status: "approved",
        };

        destination4 = {
          id: 11,
          destination: "Mikonos, Greece",
          estimatedLodgingCostPerDay: 140,
          estimatedFlightCostPerPerson: 1000,
        };
        
        trip5 = {
           id: 48,
           userID: 44,
           destinationID: 14,
           travelers: 6,
           date: "2021/01/31",
           duration: 8,
           status: "pending",
        };

        destination5 = {
          id: 14,
          destination: "Marrakesh, Morocco",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 830
        };


      travelerData = {
        id: 44,
        name: "Ham Leadbeater",
      }
      destinations = [destination1, destination2, destination3, destination4, destination5]
      travelerTrips = [trip1, trip2, trip3, trip4, trip5]
      traveler = new Traveler(travelerData, travelerTrips)
    });

    it("should be a function", () => {
      expect(Traveler).to.be.a("function");
    });

    it("should be an instance of traveler", () => {
      expect(traveler).to.be.an.instanceOf(Traveler)
    });

    it("should have and id", () => {
      expect(traveler.id).to.equal(44)
    });

    it("should have a name", () => {
      expect(traveler.name).to.equal("Ham Leadbeater")
    });

    it("should have trips", () => {
      expect(traveler.trips).to.deep.equal([trip1,trip2,trip3, trip5])
    });

    it("should have past trips", () => {
      expect(traveler.getTripItinerary("past")).to.deep.equal([trip2])//today is 12/31/20
    });

    it("should have upcoming trips", () => {
      expect(traveler.getTripItinerary("upcoming")).to.deep.equal([trip1, trip3])
    });

    it("should have pending trips", () => {
      expect(traveler.getTripItinerary("pending")).to.deep.equal([trip5])
    });

    it.skip("should have the yearly total spent traveling", () => {
      expect(traveler.totalYearlySpent()).to.equal()
    });
  });