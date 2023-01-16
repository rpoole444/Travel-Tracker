const { expect } = require("chai");
const Destinations = require("../src/Destinations");
const Traveler = require("../src/Traveler");
// const Trip = require("../src/Trip")

describe("traveler", () => {
  let trip1;
  let trip2;
  let trip3;
  let trip4;
  let trip5;
  let trip6;
  let traveler1;
  let traveler2;
  let travelerData1;
  let travelerData2;
  let trips;
  let destinations;
  let destination1;
  let destination2;
  let destination3;
  let destination4;
  let destination5;
  let destination6;

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

    destination2 = {
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
      estimatedFlightCostPerPerson: 830,
    };

    trip6 = {
      id: 48,
      userID: 44,
      destinationID: 13,
      travelers: 6,
      date: "2023/01/20",
      duration: 8,
      status: "pending",
    };

    destination6 = {
      id: 13,
      destination: "Marrakesh, Morocco",
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 830,
    };

    travelerData1 = {
      id: 44,
      name: "Ham Leadbeater",
    };
    travelerData2 = {
      id: 4,
      name: "Brucy Boy",
    };
    destinations = new Destinations([
      destination1,
      destination2,
      destination3,
      destination4,
      destination5,
      destination6,
    ]);
    trips = [trip1, trip2, trip3, trip4, trip5, trip6];
    traveler1 = new Traveler(travelerData1, trips);
    traveler2 = new Traveler(travelerData2, trips);
  });

  it("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("should be an instance of traveler", () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
  });

  it("should have and id", () => {
    expect(traveler1.id).to.equal(44);
    expect(traveler2.id).to.equal(4);
  });

  it("should have a name", () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
    expect(traveler2.name).to.equal("Brucy Boy");
  });

  it("should have trips", () => {
    expect(traveler1.trips).to.deep.equal([trip1, trip2, trip3, trip5, trip6]);
    expect(traveler2.trips).to.deep.equal([trip4]);
  });

  it("should be able to have just a First Name", () => {
    expect(traveler1.findFirstName()).to.equal("Ham");
    expect(traveler2.findFirstName()).to.equal("Brucy");
  });

  it("should have pending trips", () => {
    expect(traveler1.checkPendingStatus("pending")).to.deep.equal([
      trip5,
      trip6,
    ]);
    expect(traveler2.checkPendingStatus("pending")).to.deep.equal([]);
  });

  it("should have past trips", () => {
    expect(traveler1.getTripItinerary("past")).to.deep.equal([
      trip1,
      trip2,
      trip3,
      trip5,
    ]);
    expect(traveler2.getTripItinerary("past")).to.deep.equal([trip4]);
  }); //"today" is 12/31/2022

  it("should have upcoming trips", () => {
    expect(traveler1.getTripItinerary("upcoming")).to.deep.equal([trip6]);
    expect(traveler2.getTripItinerary("upcoming")).to.deep.equal([]);
  });

  it("should have the yearly total spent traveling", () => {
    expect(
      traveler1.totalYearlySpent(traveler1.trips, destinations.destinations)
    ).to.equal("6094.00");
    expect(
      traveler2.totalYearlySpent(traveler2.trips, destinations.destinations)
    ).to.equal("0.00");
  });

  it("should return an error message with no information in parameter", () => {
    traveler1.trips = undefined;
    travelerData1 = undefined;
    expect(
      traveler1.totalYearlySpent(traveler1.trips, destinations.destinations)
    ).to.deep.equal("There are No Dates in the last year");
  });

  it("should return 0 if the traveler has 0 trips in the last year", () => {
    expect(
      traveler2.totalYearlySpent(traveler2.trips, destinations.destinations)
    ).to.deep.equal("0.00");
  });

  it("should return the average of the trip with ", () => {
    expect(
      traveler1.getEstimatedCost(
        traveler1.trips,
        destinations.destinations,
        trip6
      )
    ).to.deep.equal(5540);
    expect(
      traveler2.getEstimatedCost(
        traveler2.trips,
        destinations.destinations,
        trip4
      )
    ).to.deep.equal(7120);
  });

  it("should return an error message with no information in parameter", () => {
    expect(traveler1.getEstimatedCost()).to.deep.equal(
      "Sorry Wrong Information, Please Try Again"
    );
    expect(traveler2.getEstimatedCost()).to.deep.equal(
      "Sorry Wrong Information, Please Try Again"
    );
  });
});
