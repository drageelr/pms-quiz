'use strict'

var mongoose = require('mongoose');
var { autoIncrement } = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema

const elementSchema = new Schema({
    elementId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    abv: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

// Attach autoIncrement Plugin
elementSchema.plugin(autoIncrement, {model: 'Element', field: 'elementId', startAt: 1, incrementBy: 1});

// Export CCA Schema
module.exports = mongoose.model('Element', elementSchema)