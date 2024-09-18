const AppConstants = require('./utils/constant');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./Database/db');
const routes = require('./routes/route');

require('dotenv').config();

const app = express();
const appConstant = AppConstants; // need to check
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(`${process.env.BASE_URL}`, routes);

connectToDB()
.then((db) => {
    console.log(appConstant.SUCCESSFUL);
  })
  .catch((error) => {
    console.log(appConstant.UNSUCCESSFUL, error);
});

app.listen(port, () => {
    console.log("Server is Running on " + `${port}`);
});