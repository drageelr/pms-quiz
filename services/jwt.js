'use strict'

var jwt = require('jsonwebtoken');
var Admin = require('../models/admin.model');
var Submission = require('../models/submission.model');
var customError = require('../errors/errors');


const secretKey = "8bfdaeed639560bfc78ce83fd57b2f8b9296387f";

exports.signAdmin = (id, expires = '12h') => {
    return jwt.sign({_id: id}, secretKey, {expiresIn: expires});
}

exports.signSubmission = (id) => {
    return jwt.sign({_id: id}, secretKey);
}

function decodeToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return {err: err};
    }
}

exports.verifyAdmin = async (req, res, next) => {
    try {
        let token = req.query.token;
        if (!token) {
            // throw no token error
            throw new customError.TokenError("no token");
        }

        let decodedObj = decodeToken(token);

        if (decodedObj.err) {
            // throw invalid or expired token error
            throw new customError.TokenError("invlaid or expired token");
        }

        let admin = await Admin.findById(decodedObj._id);

        if (admin) {
            req.body.admin_id = decodedObj._id;
            next();
        } else {
            // throw invalid or expired token error
            throw new customError.TokenError("invalid or expired token");
        }
    } catch (err) {
        next(err);
    }
}

exports.verifySubmission = async (req, res, next) => {
    try {
        let token = req.query.token;
        if (!token) {
            // throw no token error
            throw new customError.TokenError("no token");
        }

        let decodedObj = decodeToken(token);

        if (decodedObj.err) {
            // throw invalid or expired token error
            throw new customError.TokenError("invalid or expired token");
        }

        let submission = await Submission.findById(decodedObj._id);

        if (submission) {
            req.body.submission_id = decodedObj._id;
            next()
        } else {
            // throw invalid or expired token error
            throw new customError.TokenError("invalid or expired token");
        }
    } catch(err) {
        next(err);
    }
}