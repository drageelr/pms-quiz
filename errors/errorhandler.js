'use strict'

var ValidationError = require('express-validation').ValidationError;

var customError = require('../errors/errors');


exports.errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.json({
            statusCode: 400,
            statusName: "BAD REQUEST",
            message: "Request object validation failed!",
            error: {
                name: "ValidationError",
                details: err.details
            }
        });
    } else if (err instanceof customError.TokenError ||
        err instanceof customError.InvalidCredentialsError ||
        err instanceof customError.NotFoundError ||
        err instanceof customError.ValidationError) {
        res.json({
            statusCode: err.statusCode,
            statusName: err.statusName,
            message: err.message,
            error: {
                name: err.name,
                details: err.details
            }
        });
    }
}