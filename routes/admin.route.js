'use strict'

var router = require('express').Router();
var jwt = require('../services/jwt');
var adminValidation = require('../validations/admin.validation');
var adminController = require('../controllers/admin.controller');

router.post(
    '/login',
    validate(adminValidation.login, { keyByField: true }),
    adminController.login
);

router.post(
    '/change-password',
    validate(adminValidation.changePassword, { keyByField: true }),
    jwt.verifyAdmin,
    adminController.changePassword
);

router.post(
    '/forgot-password',
    validate(adminValidation.forgotPassword, { keyByField: true }),
    adminController.forgotPassword
);

router.post(
    '/add-elements',
    validate(adminValidation.addElements , { keyByField: true }),
    jwt.verifyAdmin,
    adminController.addElements
);

router.post(
    '/wipe-elements',
    jwt.verifyAdmin,
    adminController.wipeElements
);

router.post(
    '/fetch-elements',
    adminController.fetchElements
);

router.post(
    '/add-questions',
    validate(adminValidation.addQuestions , { keyByField: true }),
    jwt.verifyAdmin,
    adminController.addQuestions
);

router.post(
    '/wipe-questions',
    jwt.verifyAdmin,
    adminController.wipeQuestions
);

router.post(
    '/fetch-questions',
    jwt.verifyAdmin,
    adminController.fetchQuestions
);

module.exports = router;