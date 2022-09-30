//const request = require("request")

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCordinate = require("./utils/geocode");
const foreCast = require("./utils/forecast");

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handel bar and views location
app.set("view engine", "hbs"); // to set handle bars
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("", {
    tittle: "Weather",
    location: "Darbhanga",
    name: "Avinash",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    tittle: "About me",
    name: "Avinash",
    age: 28,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    tittle: "Help page",
    name: "Avinash",
  });
});
// app.get("" , (req,res)=>{
//     res.send("<h1>Weather</h1>")
// })

// app.get("/help",(req,res)=>{
//     res.send({
//         name : "Avi" ,
//         age : 28,
//     })
// })

// app.get("/about",(req,res)=>{
//     res.send("<h1>About page!</h1>")
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address",
    });
  }

  geoCordinate(
    req.query.address,
    (error, { latitude, longitude, location }={}) => {
      if (error) {
        return res.send({ error });
      }

      foreCast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          foreCast: foreCastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// else {
//   console.log(req.query.address)
//   res.send({
//     location: "Darbhanga",
//     forecast: "30 degree",
//     address : req.query.address
//   });
// }

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});
// error page
app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Avi",
    tittle: "404",
    errorPage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Avi",
    tittle: "404",
    errorPage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
