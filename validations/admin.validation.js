'use strict'

var Joi = require('@hapi/joi');

exports.login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};

exports.changePassword = {
    body: Joi.object({
        password: Joi.string().required()
    })
};

exports.forgotPassword = {
    body: Joi.object({
        email: Joi.string().email().required()
    })
};

exports.addElements = {
    body: Joi.object({
        elements: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            abv: Joi.string().required(),
            type: Joi.string().required()
        })).required()
    })
};

exports.addQuestions = {
    body: Joi.object({
        questions: Joi.array().items(Joi.object({
            text: Joi.string().required(),
            options: Joi.array().items(Joi.object({
                text: Joi.string().required()
            })).required(),
            correctOption: Joi.number().required(),
            elementId: Joi.number().required()
        })).required()
    })
};