'use strict';

// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var tripSchema = mongoose.Schema({
    rank: {
        type: String,
        min: [1, 'Rank must be a positive integer'],
        required: [false, 'Please enter a method of transport']
    },
    name: {
        type: String,
        min: [1, 'Too few characters'],
        max: 100,
        required: [true, 'Please enter a name.']
    },
    points: {
        type: String,
        min: [1, 'Please enter a point value'],
        required: [true, 'Please enter a point value']
    },
    qrcode: {
        type: Buffer,
        required: [false, 'QR Code must be generated']
    },
    UserId: {
        type: String
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Trip', tripSchema);