"use strict";

import JsonPatch from 'json-patch';

import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

module.exports = (router, middlewares) => {

    router.route('/json-patch')

        .all(middlewares.authenticate)

        .post( (req, res, next) => {

            const jsonBody = req.body.json;
            const jsonPatch = req.body.patch;

            if (!isExist(jsonBody) || !isExist(jsonPatch)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    message: "Both json and patch are required fields"
                });
            }

            const result = JsonPatch.apply(jsonBody, jsonPatch);

            res.status(HTTP.OK).json(result);

        } );

};
