"use strict";

import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

module.exports = (router, middlewares) => {

    router.route('/img-thumb')

        .all(middlewares.authenticate)

        .post( (req, res, next) => {

            const url = req.body.url;

            res.status(HTTP.OK).json({
                url
            });

        } );

};
