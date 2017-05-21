"use strict";

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";

export default class Root {

    constructor(router) {
        router.route('/')

        .all(Middlewares.controllerBase)

        .get(this.get)

        .post(this.post);
    }

    get(req, res, next) {
        res.status(HTTP.OK).json("Welcome to my world!");
    }

    post(req, res, next) {
        res.status(HTTP.OK).json("So, you know there are more than one type of request");
    }


} // class end
