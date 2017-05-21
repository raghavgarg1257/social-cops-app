"use strict";

import Middlewares from "./helpers/middlewares";
import _root from "./controllers/root";
import _login from "./controllers/login";
import _jsonPatch from "./controllers/jsonPatch";
// import _imgThumb from "./controllers/imgThumb";

module.exports = express => {

    // initiaizing express router
    const router = express.Router();
    const middlewares = new Middlewares();

    // middleware
    router.use(middlewares.applicationBase);

    // actual routes
    // router is compusary as a first arg and then we can send anything
    // we are sending router because its an object and object are passed by refrence
    _root(router, middlewares);
    _login(router, middlewares);
    _jsonPatch(router, middlewares);

    // at this point router will contain all the routes and now it can be added to the express instance

    // return instance of router so that it can be added to the express instance
    return router;

}
