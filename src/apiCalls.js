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

export default { fetchAllData };