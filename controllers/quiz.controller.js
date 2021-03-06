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

        if (reqElements.length != params.elementIds.length) {
            // throw bad request error
            throw new customError.ValidationError("invalid element(s)");
        }

        let reqQuestions = await Question.find({elementId: {$in: reqElements.map(e => e._id)}});

        if (reqQuestions.length == 0) {
            // throw not found error
            throw new customError.ValidationError('invalid question(s)');
        }

        let questionBank = reqQuestions.map(q => ({questionId: q.questionId, text: q.text, options: q.options.map(o => o.text)}));

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
    
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
    
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
    
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
    
            return array;
        }

        let questions = shuffle(questionBank);

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
            let s = 0;
            for (; s < reqSubmission.questions.length; s++) {            
                if (reqSubmission.questions[s].questionId.toString() == reqQuestions[i]._id.toString()) {
                    break;
                }
            }
            let resultObj = {};
            if (s != reqQuestions.length) {
                resultObj = {
                    text: reqQuestions[i].text,
                    options: reqQuestions[i].options.map(o => o.text),
                    correct: reqQuestions[i].correctOption == reqSubmission.questions[s].selectedOption ? true : false,
                    selectedOption: reqSubmission.questions[s].selectedOption
                };
            }

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