"use strict";

import Raven from 'raven';

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";

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
        }

    }

    post(req, res, next) {

        try {

            res.status(HTTP.OK).json("So, you know there are more than one type of request");

        } catch (e) {
            Raven.captureException(e);
        }

    }


} // class end
