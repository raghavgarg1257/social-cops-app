"use strict";

import jsonpatch from 'json-patch';

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

export default class JsonPatch {

    constructor(router) {
        router.route('/json-patch')

        .all(Middlewares.authenticate)

        .post(this.post);
    }

    post(req, res, next) {

        const body = req.body.json;
        const patch = req.body.patch;

        if (!isExist(body) || !isExist(patch)) {
            return res.status(HTTP.BAD_REQUEST).json({
                message: "Both json and patch are required fields"
            });
        }

        const result = jsonpatch.apply(body, patch);

        res.status(HTTP.OK).json(result);

    }


} // class end
