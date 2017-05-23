"use strict";

import Raven from 'raven';
import Jwt from "jsonwebtoken";

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

export default class Login {

    constructor(router) {

        try {

            router.route('/login')

            .all(Middlewares.controllerBase)

            .post(this.post);

        } catch (e) {
            Raven.captureException(e);
        }

    }

    post(req, res, next) {

        try {

            const username = req.body.username;
            const password = req.body.password;

            if (!isExist(username) || !isExist(password)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    error: "Both username and password are required fields"
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

        } catch (e) {
            Raven.captureException(e);
        }

    }


} // class end
