"use strict";

import Jwt from "jsonwebtoken";

import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

module.exports = (router, middlewares) => {

    router.route('/login')

        .all(middlewares.controllerBase)

        .post( (req, res, next) => {

            const username = req.body.username;
            const password = req.body.password;

            if (!isExist(username) || !isExist(password)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    message: "Both username and password are required fields"
                });
            }

            const token = Jwt.sign(
                { username, password },
                new Buffer(process.env.JWT_SECRET, "base64"),
                { algorithm: 'HS512', expiresIn: '1d' }
            );

            res.status(HTTP.OK).json({
                message: "User successfully authenticated",
                data: { username, token }
            });

        } );

};
