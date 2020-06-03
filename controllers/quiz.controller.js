'use strict'

var Element = require('../models/element.model');
var Question = require('../models/question.model');
var Submission = require('../models/submission.model');
var jwt = require('../services/jwt');
var customError = require('../errors/errors');

async function validateSubmission(questions, questionIds) {
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
}

exports.start = async (req, res, next) => {
    try {
        let params = req.body;

        let reqElements = await Element.find({elementId: {$in: params.elementIds}}, '_id');

        if (reqElements.length != params.elements.length) {
            // throw bad request error
        }

        let reqQuestions = await Question.find({elementId: {$in: reqElements.map(e => e._id)}});

        if (reqQuestions.length == 0) {
            // throw not found error
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

        let reqSubmission = new Submission({
            name: params.name,
            email: params.email,
            questions: params.questions
        });

        await reqSubmission.save();

        let token = jwt.signSubmission(reqSubmission._id);

        // send email here!

        res.json({
            statusCode: 200,
            statusName: "OK",
            message: "Submission Successful!"
        })
    } catch(err) {
        next(err);
    }
}

exports.result = async (req, res, next) => {
    try {
        let reqSubmission = await Submission.findById(req.body.submission_id);

        
    } catch(err) {
        next(err);
    }
}