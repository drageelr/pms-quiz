'use strict'

var mongoose = require('mongoose');
var { autoIncrement } = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema

const optionSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

const questionSchema = new Schema({
    questionId: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    options: [optionSchema],
    correctOption: {
        type: Number,
        required: true
    },
    elementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Element",
        required: true
    }
});

// Attach autoIncrement Plugin
questionSchema.plugin(autoIncrement, {model: 'Question', field: 'questionId', startAt: 1, incrementBy: 1});

// Export CCA Schema
module.exports = mongoose.model('Question', questionSchema)