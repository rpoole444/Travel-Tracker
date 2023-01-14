const fetchApiUrl = (path) => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch(error => console.log(`${path} error`));
};

const fetchAllData = () => {
  return Promise.all([
    fetchApiUrl("travelers"),
    fetchApiUrl("trips"),
    fetchApiUrl("destinations"),
  ]);
};

const addNewTripData = (newDataEntry) => {
   return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataEntry),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log("Error!", err));

      }

export default { fetchAllData, addNewTripData };