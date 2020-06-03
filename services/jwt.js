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
        let token = req.get("Authorization");
        if (token) {
            token = token.substring(7);
        } else {
            // throw no token error
        }

        let decodedObj = decodeToken(token);

        if (decodedObj.err) {
            // throw invalid or expired token error
        }

        let admin = await Admin.findById(decodedObj._id);

        if (admin) {
            req.body.admin_id = decodedObj._id;
            next();
        } else {
            // throw invalid or expired token error
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
        }

        let decodedObj = decodeToken(token);

        if (decodedObj.err) {
            // throw invalid or expired token error
        }

        let submission = await Submission.findById(decodedObj._id);

        if (submission) {
            req.body.submission_id = decodedObj._id;
            next()
        } else {
            // throw invalid or expired token error
        }
    } catch(err) {
        next(err);
    }
}