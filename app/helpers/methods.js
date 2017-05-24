import Raven from 'raven';
import HTTP from "./httpcodes";

// Global function
export const isExist = val => {

    try {

        if (
            typeof val === 'undefined' ||
            val === undefined ||
            val === null ||
            val === '' ||
            (typeof val === 'array' && val.length === 0) ||
            (typeof val === 'object' && Object.keys(val).length === 0)
        ) {
            return false;
        }
        else {
            return true;
        }

    } catch (e) {
        Raven.captureException(e);
    }

}

// Global Error Handler
export class ErrorHandler {

    constructor (res) {
        this.res = res;
    }

    ISE(e) {
        return this.res.status(HTTP.INTERNAL_SERVER_ERROR).json({
            error: e
        });
    }

}
