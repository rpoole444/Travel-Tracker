const { expect } = require("chai");
const Trip = require("../src/Trip");

describe("Trips", () => {
  let trips;
  let tripData;
  beforeEach(() => {
    tripData = [
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 3,
        userID: 3,
        destinationID: 22,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 4,
        userID: 43,
        destinationID: 14,
        travelers: 2,
        date: "2022/02/25",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 5,
        userID: 44,
        destinationID: 29,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ];
    trips = new Trip(tripData);
  });

  it("should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  it("should be an instance of Trip", () => {
    expect(trips).to.be.an.instanceOf(Trip);
  });

  it("should have trips", () => {
    expect(trips.trips).to.deep.equal(tripData);
  });

  it("should be able to find trips by ID", () => {
    expect(trips.getTripsByID(44)).to.deep.equal([
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 5,
        userID: 44,
        destinationID: 29,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });
});
