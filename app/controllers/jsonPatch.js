"use strict";

import Raven from 'raven';
import jsonpatch from 'json-patch';

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

export default class JsonPatch {

    constructor(router) {

        try {

            router.route('/json-patch')

            .all(Middlewares.authenticate)

            .post(this.post);

        } catch (e) {
            Raven.captureException(e);
        }

    }

    post(req, res, next) {

        try {

            const body = req.body.json;
            const patch = req.body.patch;

            if (!isExist(body) || !isExist(patch)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    error: "Both json and patch are required fields"
                });
            }

            try {
                const result = jsonpatch.apply(body, patch);
            } catch (e) {
                return res.status(HTTP.BAD_REQUEST).json({
                    error: e.message
                });
            }

            res.status(HTTP.OK).json(result);

        } catch (e) {
            Raven.captureException(e);
        }

    }


} // class end
