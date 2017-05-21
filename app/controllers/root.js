"use strict";

import HTTP from "../helpers/httpcodes";

module.exports = (router, middlewares) => {

    router.route('/')

        .all(middlewares.controllerBase)

        .get( (req, res, next) => {
            res.status(HTTP.OK).json("Welcome to my world!");
        } )

        .post( (req, res, next) => {
            res.status(HTTP.OK).json("So, you know there are more than one type of request");
        } );

};
