'use strict'

var router = require('express').Router();
var { validate } = require('express-validation');
var jwt = require('../services/jwt');
var quizValidation = require('../validations/quiz.validation');
var quizController = require('../controllers/quiz.controller');

router.post(
    '/start',
    validate(quizValidation.start, { keyByField: true }),
    quizController.start
);

router.post(
    '/submit',
    validate(quizValidation.submit, { keyByField: true }),
    quizController.submit
);

router.post(
    '/result',
    jwt.verifySubmission,
    quizController.result
)

module.exports = router;