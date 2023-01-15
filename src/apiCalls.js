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
  //   .then((res) => {
  //     if(!res.ok){
  //       throw new Error(`${res.status} - ${res.statusText}`)
  //     }
  //     fetchAllData().then(data => {
  //       updateData(data)
  //     })
  // // 
  //   })
    
    // .catch((err) => {
    //   //update error message on DOM!
    //   //if it's too challenging here, do the catch in th scripts at the invocation of this function
    //   err.message
    // });

      }

export default { fetchAllData, addNewTripData };