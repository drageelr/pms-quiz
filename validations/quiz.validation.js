'use strict'

var Joi = require('@hapi/joi');

exports.start = {
    body: Joi.object({
        elementIds: Joi.array().items(Joi.number()).required(),
        count: Joi.number().required().min(10).max(30)
    })
};

exports.submit = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        quesitons: Joi.array().items(Joi.object({
            questionId: Joi.number().required(),
            selectedOption: Joi.number().required()
        }))
    })
};