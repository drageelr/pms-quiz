'use strict'

class TokenError extends Error {
    constructor(errDetails) {
        super();
        this.name = "TokenError";
        this.statusCode = 400;
        this.statusName = "BAD REQUEST"
        this.message = "Invalid Token";
        this.details = errDetails;
    
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenError);
        }
    }
}

class InvalidCredentialsError extends Error {
    constructor(errDetails) {
        super();
        this.name = "InvalidCredentialsError";
        this.statusCode = 401;
        this.statusName = "UNAUTHORIZED"
        this.message = "Invalid Credentials";
        this.details = errDetails;
    
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenError);
        }
    }
}

class NotFoundError extends Error {
    constructor(errDetails) {
        super();
        this.name = "NotFoundError";
        this.statusCode = 404;
        this.statusName = "NOT FOUND"
        this.message = "Target Or Resource Not Found";
        this.details = errDetails;
    
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenError);
        }
    }
}

class ValidationError extends Error {
    constructor(errDetails) {
        super();
        this.name = "ValidationError";
        this.statusCode = 400;
        this.statusName = "BAD REQUEST"
        this.message = "Invalid Input";
        this.details = errDetails;
    
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenError);
        }
    }
}

module.exports.TokenError = TokenError;
module.exports.InvalidCredentialsError = InvalidCredentialsError;
module.exports.NotFoundError = NotFoundError;
module.exports.ValidationError = ValidationError;