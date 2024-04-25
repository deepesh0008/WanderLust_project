const Joi = require('joi');
const review = require('./models/review');

// Joi module is a popular module for data validation. 
// This module validates the data based on schemas. 
// There are various functions like optional(), required(), min(), max(), etc which make it easy
//  to use and a user-friendly module for validating the data.

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("" , null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
});