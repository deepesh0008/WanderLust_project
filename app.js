if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const { createSecretKey } = require("crypto");
// const { resolveAny } = require("dns");

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

// Database create karne ke liye....
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
const dbUrl = process.env.ATLASDB_URL;
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(dbUrl);
};

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});

store.on("error" , () => {
    console.log("Error in mongo session store" , err);
});

// Using sessions in our Project.....
// COOKIE  ==>  used to track our sessions
const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 60 * 60 * 1000,
        maxAge : 7 * 60 * 60 * 1000,
        httpOnly : true
    }
};

// app.get("/" , (req,res) => {
//     res.send("HI , I am Root")
// });

app.use(session(sessionOptions));
app.use(flash());

//Using passport.....
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creating a middleware....
app.use((req , res , next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// For all listing routes this line is being used .....
app.use("/listings" , listingRouter);
// For all review routes this line is being used.....
app.use("/listings/:id/reviews" , reviewRouter);
// For all user routes this line is being used.....
app.use("/" , userRouter);

// Error handler Middlewares......
app.all("*"  , (req,res,next) => {
    next(new ExpressError(404 , "Page not Found"));
});

app.use((err, req, res, next) => {
    // Deconstructing Express Error....
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080 , () => {
    console.log("server listening at port 8080")
});