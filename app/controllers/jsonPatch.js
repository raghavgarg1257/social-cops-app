"use strict";

import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

module.exports = (router, middlewares) => {

    router.route('/json-patch')

        .all(middlewares.authenticate)

        .post( (req, res, next) => {

            res.status(HTTP.OK).json({
                message: "hello world"
            });

        } );

};
