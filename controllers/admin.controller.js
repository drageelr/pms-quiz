'use strict'

var Admin = require('../models/admin.model');
var Element = require('../models/element.model');
var Question = require('../models/question.model');
var jwt = require('../services/jwt');
var customError = require('../errors/errors');


function validateElements(elements) {
    for (let i = 0; i < elements.length; i++) {
        if (elements.type != "risk" && elements.type != "cult") {
            return '"type" of element at position "' + (i + 1) + '" is invalid. Type must be "risk" or "cult"';
        }
    }

    return undefined;
}

function validateQuesitons(questions, elementIds) {
    for (let q = 0; q < questions.length; q++) {
        if (!(questions[q].elementId in elementIds)) {
            return '"elementId" of question at position "' + (q + 1) + '" is invalid';
        }

        if (questions[q].correctOption < 0 || questions[q].correctOption > questions[q].options.length) {
            return '"correctOption" of question at position "' + (q + 1) + '" is out of range';
        }
    }

    return undefined;
}


exports.login = async (req, res, next) => {
    try {
        let params = req.body;

        let reqAdmin = await Admin.findOne({email: params.email, password: params.password});

        if (!reqAdmin) {
            // throw invalid credentials error
        }

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Logged In Successfully!",
            token: jwt.verifyAdmin(reqAdmin._id)
        });
    } catch(err) {
        next(err);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        let params = req.body;

        await Admin.findByIdAndUpdate(params.admin_id, {password: params.password});

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Password Changed Successfully!"
        });
    } catch(err) {
        next(err);
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        let params = req.body;

        let reqAdmin = await Admin.findOne({email: params.email});

        if (!reqAdmin) {
            // throw admin not found error
        }

        let token = jwt.signAdmin(reqAdmin_id, "1h");

        // send email here!

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Email Sent Successfully!"
        });
    } catch(err) {
        next(err);
    }
}

exports.addElements = async (req, res, next) => {
    try {
        let params = req.body;

        let validationError = validateElements(params.elements);

        if (validationError) {
            // throw bad request error
        }

        await Element.create(params.elements, 'elementId');

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Element(s) Created Successfully!",
        });
    } catch(err) {
        next(err);
    }
}

exports.wipeElements = async (req, res, next) => {
    try {

        await Element.deleteMany({});
        await Question.deleteMany({});

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Element(s) & Question(s) Wiped Successfully!"
        });
    } catch(err) {
        next(err);
    }
}

exports.fetchElements = async (req, res, next) => {
    try {
        let reqElements = await Element.find({});

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Element(s) Fetched Successfully!",
            elements: reqElements.map(e => ({
                elementId: e.elementId,
                name: e.name,
                abv: e.abv,
                type: e.type
            }))
        })
    } catch(err) {
        next(err);
    }
}

exports.addQuestions = async (req, res, next) => {
    try {
        let params = req.body;

        let reqElements = await Element.find({}, 'elementId');

        if (reqElements.length == 0) {
            // throw bad request error
        }

        let validationError = validateQuesitons(params.questions, reqElements.map(e => e.elementId));

        if (validationError) {
            // throw bad request error
        }

        await Question.create(params.questions);

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Question(s) Created Successfully!"
        })
    } catch(err) {
        next(err);
    }
}

exports.wipeQuestions = async (req, res, next) => {
    try {

        await Question.deleteMany({});

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Question(s) Wiped Successfully!"
        });
    } catch(err) {
        next(err);
    }
}

exports.fetchQuestions = async (req, res, next) => {
    try {
        let reqQuestions = await Question.find({});

        let questions = [];

        for (let q of reqQuestions) {
            let questionObj = {
                questionId: q.questionId,
                text: q.text,
                options: q.map(o => o.text),
                correctOption: q.correctOption,
            }

            let reqElement = await Element.findById(q.elementId, 'elementId');

            questionObj.elementId = reqElement.elementId;

            questions.push(questionObj);
        }

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Element(s) Fetched Successfully!",
            questions: questions
        })
    } catch(err) {
        next(err);
    }
}