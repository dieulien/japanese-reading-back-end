const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')

const app = express();

app.use(bodyParser.json());
app.use(cors());

// const pg = knex({
//   client: "pg",
//   connection: {
//     host: "localhost",
//     user: "postgres",
//     password: "pgpassword",
//     database: "japlearn",
//   },
// });
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const pg = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    //sl: true,
  },
});

app.get("/", (req, res) => {
  res.json("Home Page");
});

app.post("/signin", signin.handleSignIn(pg,bcrypt));

app.post("/register", register.handleRegister(pg,bcrypt));

app.get("/profile/:userId", profile.handleProfileGet(pg));

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`)
});