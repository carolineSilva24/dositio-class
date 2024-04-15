import { UNAUTHORIZED_PERSONNEL } from "../../../libs/errors.js";
export const userIsAdmin = (app) => async (request, reply) => {
    console.log(request)
    if(request.headers['isadmin'] != "true")
        throw new UNAUTHORIZED_PERSONNEL();
    else {
        return;
    }
}