const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser());

// import routes
const sahabaRoutes = require("./api/routes/sahabas");
const userRoutes = require("./api/routes/users");
const { checkUser } = require("./api/middleware/check-auth");

// Connection to the database
const dbURI =
  "mongodb+srv://Dawa:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0.kisga.mongodb.net/DB_Sahabas?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("connection to db"))
  .catch((err) => console.log(err));
// view engine = ejs
app.set("view engine", "ejs");
app.listen(3000);
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Routes which handle requests
app.get("*", checkUser)
app.use("/sahabas", sahabaRoutes);
app.use("/users", userRoutes);

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
