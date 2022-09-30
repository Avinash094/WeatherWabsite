 const axios = require("axios")
// const forecastData = () => {
//     const url = "http://api.weatherstack.com/current?access_key=fa863b0d1f6373144f9ce15b37fd79de&query=125,56$units=m"
//     //const url = `http://api.weatherstack.com/current?access_key=fa863b0d1f6373144f9ce15b37fd79de&query=122.3,$34$units=m`;
//         axios.get(url).then(response => {
//             resolve(response.data)
        
//     })
// }
const testProm = (lat, lng) =>{
return new Promise((resolve, reject)=>{
    const url = `http://api.weatherstack.com/current?access_key=fa863b0d1f6373144f9ce15b37fd79de&query=${lat},${lng}$units=m`;
    axios.get(url).then(response => {
        resolve(`It is currently ${response.data.current.temperature} degree out. It feels like ${response.data.current.feelslike} degree out.`)
    }).catch(err=>{
        reject(err)
    })
})
}
testProm(85.8918,26.1542).then(data=>{
console.log(data)
}).catch(err=>{
    console.log(err)
})

// console.log(forecastData(122.23,54.24))
// //     }).catch (error =>{
//         console.log(error)
//     }).then (response => {
//        console.log (`It is currently ${response.body.current.temperature} degree out. It feels like ${response.body.current.feelslike} degree out.`)  
//     })
//   }
 //  forecastData(122.3, 56)

//   const foreCast = (latitude, longitude, callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=fa863b0d1f6373144f9ce15b37fd79de&query=${latitude},${longitude}$units=m`;
//     request({ url: url, json: true }, (error, response) => {
   
//       if (error) {
//         callback("Unable to connect weather service", undefined);
//       } else if (response.body.error) {
//         callback("Unable to find location", undefined);
//       } else {
//         callback(
//           undefined,`It is currently ${response.body.current.temperature} degree out. It feels like ${response.body.current.feelslike} degree out.`
//         );
//       }
//     });
//   };