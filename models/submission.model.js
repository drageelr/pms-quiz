'use strict'

var mongoose = require('mongoose');
var { autoIncrement } = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema

const questionSchema = new Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    selectedOption: {
        type: Number,
        required: true
    }
});

const submissionSchema = new Schema({
    submissionId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    questions: [questionSchema]
});

// Attach autoIncrement Plugin
submissionSchema.plugin(autoIncrement, {model: 'Submission', field: 'submissionId', startAt: 1, incrementBy: 1});

// Export CCA Schema
module.exports = mongoose.model('Submission', submissionSchema)