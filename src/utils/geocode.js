const request = require("request");
const geoCordinate = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=pk.eyJ1IjoiYXZpbmFzaDk0IiwiYSI6ImNsOGE4Z3M5YjBlY3kzdW51MmVtMXlnNTIifQ.fcQuCf-f_nLWw5XjwgfXjQ`;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect geocoordinate service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCordinate;

