"use strict";

// importing our dependencies
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Raven from "raven";
import cors from "cors";
// import logger from "morgan";


// importing our files
import Routes from "./app/routes";
import Middlewares from "./app/helpers/middlewares";


// injecting environment variables
dotenv.config();


// configure raven
Raven.config(process.env.SENTRY_DNS).install();


// initializing server requirments
const port = process.env.PORT || 3000;
export const app = express();


// to log every request to the console
// app.use(logger('dev'));


// The request handler must be the first middleware on the app for raven
app.use(Raven.requestHandler());


// enablig cors request
app.use(cors());

// set static files (css and images, etc) location
// app.use(express.static('public'));


// setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// The error handler must be before any other error middleware for raven
app.use(Raven.errorHandler());


// server error handler
app.use(Middlewares.serverErrorHandler);


try {

    // setting up routes for our app
    // we made router a function so that any instance can be passed from here
    // should be defined just before starting the server
    app.use('/', new Routes(express));


    // start the server
    app.listen(port, () => console.log(`App started at: http://localhost:${port}`) );

} catch (e) {
    Raven.captureException(e);
}
