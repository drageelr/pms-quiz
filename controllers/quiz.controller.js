'use strict'

var Element = require('../models/element.model');
var Question = require('../models/question.model');
var Submission = require('../models/submission.model');
var jwt = require('../services/jwt');
var nodemailer = require('../services/nodemailer');
var customError = require('../errors/errors');

function validateSubmission(questions, questionIds) {
    for (let q of questions) {
        let i = 0;
        for ( ; i < questionIds.length; i++) {
            if (q.questionId == questionIds[i].Id) {
                q.questionId = questionIds[i]._id;
                break;
            }
        }

        if (i == questionIds.length) {
            return '"questionId" is invalid'
        }
    }
    return undefined;
}

exports.start = async (req, res, next) => {
    try {
        let params = req.body;

        let reqElements = await Element.find({elementId: {$in: params.elementIds}}, '_id');

        // error here: TypeError: Cannot read property 'length' of undefined
        //        at exports.start (/home/zoraizq/Documents/pms-quiz/controllers/quiz.controller.js:33:51)

        if (reqElements.length != params.elements.length) {
            // throw bad request error
            throw new customError.ValidationError("invalid element(s)");
        }

        let reqQuestions = await Question.find({elementId: {$in: reqElements.map(e => e._id)}});

        if (reqQuestions.length == 0) {
            // throw not found error
            throw new customError.ValidationError('invalid question(s)');
        }

        let questionBank = reqQuestions.map(q => ({questionId: q.questionId, text: q.text, options: q.options.map(o => o.text)}));
        params.count = Math.min(params.count, reqQuestions.length);
        let questions = [];
        for ( ; params.count != 0; params.count--) {
            let rndIndex = Math.round(Math.random() * questionBank.length);
            questions.push(questionBank[rndIndex]);
            questionBank = questionBank.slice(0, rndIndex) + questionBank(rndIndex + 1, questionBank.length);
        }

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Quiz Started Successfully!",
            questions: questions
        })

    } catch(err) {
        next(err);
    }
}

exports.submit = async (req, res, next) => {
    try {
        let params = req.body;

        let reqQuestions = await Question.find({});
        let validationError = validateSubmission(params.questions, reqQuestions.map(q => ({Id: q.questionId, _id: q._id})));

        if (validationError) {
            // throw bad request error
            throw new customError.ValidationError(validationError);
        }

        let reqSubmission = new Submission({
            name: params.name,
            email: params.email,
            questions: params.questions
        });

        await reqSubmission.save();

        let token = jwt.signSubmission(reqSubmission._id);

        nodemailer.sendResultEmail(params.email, token);

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Submission Successful!",
            token: token
        });
    } catch(err) {
        next(err);
    }
}

exports.result = async (req, res, next) => {
    try {
        let reqSubmission = await Submission.findById(req.body.submission_id);
        let questionIds = reqSubmission.questions.map(q => q.questionId);
        let reqQuestions = await Question.find({_id: {$in: questionIds}});

        let result = [];
        for (let i = 0; i < reqQuestions.length; i++) {
            let resultObj = {
                text: reqQuestions[i].text,
                options: reqQuestions[i].options.map(o => o.text),
                correctOption: reqQuestions[i].correctOption,
                selectedOption: reqSubmission.questions[i].selectedOption
            };

            result.push(resultObj);
        }

        res.json({
            statusCode: 200,
            statusName: "OK",
            result: result,
        });

    } catch(err) {
        next(err);
    }
}