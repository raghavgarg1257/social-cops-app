"use strict";

import Raven from 'raven';
import Jwt from "jsonwebtoken";

import HTTP from "./httpcodes";

// all the middleware function to reuse everywhere
export default class Middleware {

    static serverErrorHandler (err, req, res, next) {

        try {

            if ( err instanceof SyntaxError && err.status === 400 && 'body' in err ) {

                return res.status(HTTP.BAD_REQUEST).json({
                    error: {
                        message: "invalid body",
                        name: "INVALID_INPUT"
                    }
                });
            }
            else {
                next();
            }

        } catch (e) {
            Raven.captureException(e);
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

        try {

            // checking if authorization header is set in the request.
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {

                // verifying the jwt token
                Jwt.verify(
                    req.headers.authorization.split(' ')[1],
                    new Buffer(process.env.JWT_SECRET, "base64"),
                    { algorithm: 'HS512' },
                    (error, decoded) => {
                        if (error) {
                            return res.status(HTTP.BAD_REQUEST).json({
                                error: {
                                    message: "invalid token in the header",
                                    name: "INVALID_TOKEN"
                                }
                            });
                        }
                        else {
                            next();
                        }
                    }
                );

            }
            else {
                return res.status(HTTP.BAD_REQUEST).json({
                    error: {
                        message: "no token found in the header",
                        name: "TOKEN_NOT_FOUND"
                    }
                });
            }

        } catch (e) {
            Raven.captureException(e);
        }

    } // function end


}
