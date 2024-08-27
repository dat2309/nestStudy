"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMessage = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
var HttpMessage;
(function (HttpMessage) {
    HttpMessage["OK"] = "OK";
    HttpMessage["BAD_REQUEST"] = "Bad Request";
    HttpMessage["UNAUTHORIZED"] = "Unauthorized";
    HttpMessage["FORBIDDEN"] = "Forbidden";
    HttpMessage["NOT_FOUND"] = "Not Found";
    HttpMessage["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
})(HttpMessage || (exports.HttpMessage = HttpMessage = {}));
//# sourceMappingURL=responseEnum.js.map