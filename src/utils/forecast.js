const request = require("request");


const foreCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=fa863b0d1f6373144f9ce15b37fd79de&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, {body}) => {

    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,`It is currently  ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degree out.`
      );
    }
  });
};





module.exports = foreCast;
