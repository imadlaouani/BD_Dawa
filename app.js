const express = require("express");
const mongoose = require("mongoose");

// we import the packages
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// import routes
const sahabaRoutes = require("./api/routes/sahabas");
const bodyParser = require("body-parser");

// Connection to the database
const dbURI =
  "mongodb+srv://Dawa:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0.kisga.mongodb.net/DB_Sahabas?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connection to db"))
  .catch((err) => console.log(err));
// view engine = ejs
app.set("view engine", "ejs");
app.listen(3000);
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
app.use((req, res, next) => {
  res.getHeader("Access-Control-Allow-Header", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTION") {
    res.header("Acces-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
    next();
  }
});*/
// Routes which handle requests
app.use("/sahabas", sahabaRoutes);

// Handling errors

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
/*
app.get("/", (req, res) => {
  const sahabas = [{ name: "Bilal" }, { name: "Omar" }, { name: "Othmane" }];
  res.render("home", { title: "Les Sahabas", sahabas });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Qui sommes-nous ? " });
});

app.get("/sahabas/create", (req, res) => {
  res.render("create_sahaba", { title: "Ajouter un Sahaba " });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
}); */
