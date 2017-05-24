"use strict";

import Raven from 'raven';
import jsonpatch from 'json-patch';

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";
import { isExist, ErrorHandler } from "../helpers/methods";

export default class JsonPatch {

    constructor(router) {

        try {

            router.route('/json-patch')

            .all(Middlewares.authenticate)

            .post(this.post);

        } catch (e) {
            Raven.captureException(e);
            return new ErrorHandler(res).ISE(e);
        }

    }

    post(req, res, next) {

        try {

            const body = req.body.json;
            const patch = req.body.patch;

            if (!isExist(body) || !isExist(patch)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    error: {
                        message: "Both json and patch are required fields",
                        name: "REQUIRED_FIELDS_NOT_FOUND"
                    }
                });
            }

            const result = jsonpatch.apply(body, patch);

            res.status(HTTP.OK).json(result);

        } catch (e) {
            Raven.captureException(e);
            return res.status(HTTP.BAD_REQUEST).json({
                error: e
            });
        }

    }


} // class end
