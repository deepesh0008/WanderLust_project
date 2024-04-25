// Express Routers are a way to organise your express application s.t. our primary app.js file 
// does not become bloated or messy....
// const router = express.Router()       =>      Creates new router object.....

const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js")

//All Review routes are cut from  app.js  to  review.js.....
//Post Route.....
router.post("/" , 
    isLoggedIn , 
    validateReview , 
    wrapAsync(reviewController.createReview)
);

//Delete Route.....
router.delete(
    "/:reviewId" , 
    isLoggedIn , 
    isReviewAuthor, 
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;