const { expect } = require("chai");
const Traveler = require("../src/Traveler")
const Trip = require("../src/Trip")

  describe("traveler", () => {
    let traveler;
    let travelerData;
    let trip1;
    let trip2;
    let trip3;
    let travelerTrips;
    beforeEach(() => {
      trip1 = new Trip ({
          id: 1,
          userID: 44,
          destinationID: 49,
          travelers: 1,
          date: "2022/09/16",
          duration: 8,
          status: "approved",
       });

       trip2 = new Trip({
          id: 46,
          userID: 44,
          destinationID: 33,
          travelers: 2,
          date: "2020/08/24",
          duration: 11,
          status: "approved",
       });

       trip3 = new Trip({
          id: 48,
          userID: 44,
          destinationID: 14,
          travelers: 6,
          date: "2021/02/10",
          duration: 8,
          status: "approved",
       });

      travelerData = {
        id: 1,
        name: "Ham Leadbeater",
      }
      travelerTrips = [trip1,trip2,trip3]
      traveler = new Traveler(travelerData, travelerTrips)
    });

    it("should be a function", () => {
      expect(Traveler).to.be.a("function");
    });

    it("should be an instance of traveler", () => {
      expect(traveler).to.be.an.instanceOf(Traveler)
    });

    it("should have and id", () => {
      expect(traveler.id).to.equal(1)
    });

    it("should have a name", () => {
      expect(traveler.name).to.equal("Ham Leadbeater")
    });

    it("should have trips", () => {
      expect(traveler.trips).to.deep.equal([trip1,trip2,trip3])
    });

    it.skip("should have past trips", () => {
      expect(traveler.findPastTrips()).to.equal([trip2])//today is 12/31/20
    });

    it.skip("should have upcoming trips", () => {
      expect(traveler.findUpcomingTrips()).to.equal([trip1, trip3])
    });

    it.skip("should have pending trips", () => {
      expect(traveler.findPendingTrips()).to.equal([])
    })

  });