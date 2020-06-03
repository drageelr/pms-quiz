'use strict'

var mongoose = require('mongoose');
var { autoIncrement } = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema

const adminSchema = new Schema({
    adminId: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// Attach autoIncrement Plugin
adminSchema.plugin(autoIncrement, {model: 'Admin', field: 'adminId', startAt: 1, incrementBy: 1});

// Export CCA Schema
module.exports = mongoose.model('Admin', adminSchema)