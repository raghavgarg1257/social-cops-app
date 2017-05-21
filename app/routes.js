"use strict";

import Middlewares from "./helpers/middlewares";
import Root from "./controllers/root";
import Login from "./controllers/login";
import JsonPatch from "./controllers/jsonPatch";
import ImgThumb from "./controllers/imgThumb";

export default class Routes {

    constructor(express) {

        // initiaizing express router
        const router = express.Router();

        // middleware
        router.use(Middlewares.applicationBase);

        // actual routes
        // router is compusary as a first arg and then we can send anything
        // we are sending router because its an object and obj  ect are passed by refrence
        new Root(router);
        new Login(router);
        new JsonPatch(router);
        new ImgThumb(router);

        // at this point router will contain all the routes and now it can be added to the express instance

        // return instance of router so that it can be added to the express instance
        return router;
    }


}
