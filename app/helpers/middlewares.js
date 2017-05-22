"use strict";

import Jwt from "jsonwebtoken";

import HTTP from "./httpcodes";

// all the middleware function to reuse everywhere
export default class Middleware {

    static serverErrorHandler (err, req, res, next) {

        if ( err instanceof SyntaxError && err.status === 400 && 'body' in err ) {

            return res.status(HTTP.BAD_REQUEST).json({
                error: "invalid json"
            });
        }
        else {
            next();
        }

    }

    // will run first for every route in the app
    static applicationBase (req, res, next) {
        next();
    }

    // will run for every request on the mentioned route
    static controllerBase (req, res, next) {
        next();
    }

    // authenticating user with session/jwt
    static authenticate (req, res, next) {

        // checking if authorization header is set in the request.
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {

            // verifying the jwt token
            Jwt.verify(
                req.headers.authorization.split(' ')[1],
                new Buffer(process.env.JWT_SECRET, "base64"),
                { algorithm: 'HS512' },
                (error, decoded) => {
                    if (error) {
                        return res.status(HTTP.BAD_REQUEST).json("Invalid token.");
                    }
                    else {
                        next();
                    }
                }
            );

        }
        else {
            return res.status(HTTP.BAD_REQUEST).json("No token found.");
        }

    } // function end


}
