"use strict";

import Raven from 'raven';

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";
import { ErrorHandler } from "../helpers/methods";

export default class Root {

    constructor(router) {

        try {

            router.route('/')

            .all(Middlewares.controllerBase)

            .get(this.get)

            .post(this.post);

        } catch (e) {
            Raven.captureException(e);
        }

    }

    get(req, res, next) {

        try {

            res.status(HTTP.OK).json("Welcome to my world!");

        } catch (e) {
            Raven.captureException(e);
            return new ErrorHandler(res).ISE(e);
        }

    }

    post(req, res, next) {

        try {

            res.status(HTTP.OK).json("So, you know there are more than one type of request");

        } catch (e) {
            Raven.captureException(e);
            return new ErrorHandler(res).ISE(e);
        }

    }


} // class end
