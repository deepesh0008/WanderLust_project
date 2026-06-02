if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
};

// Clean up environment variables (remove surrounding quotes if pasted from .env directly)
for (const key in process.env) {
    if (process.env[key] && typeof process.env[key] === 'string') {
        let value = process.env[key].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            process.env[key] = value.slice(1, -1);
        }
    }
}

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
    .then(async () => {
        console.log("Connected to DB");
        await seedAdminUser();
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(dbUrl, { family: 4 });
};

async function seedAdminUser() {
    try {
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
        const adminEmail = process.env.ADMIN_EMAIL || "admin@wanderlust.com";

        const existingAdmin = await User.findOne({ username: adminUsername });
        if (!existingAdmin) {
            const newAdmin = new User({
                username: adminUsername,
                email: adminEmail
            });
            await User.register(newAdmin, adminPassword);
            console.log(`Default admin user seeded: ${adminUsername}`);
        } else {
            console.log(`Admin user '${adminUsername}' already exists in database.`);
        }
    } catch (err) {
        console.error("Error seeding default admin user:", err.message);
    }
}

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});

store.on("error" , (err) => {
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

app.get("/" , (req,res) => {
    res.redirect("/listings");
});

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
    let { statusCode = 500 } = err;
    let message = "Something Went Wrong! Please try again later.";
    
    if (statusCode === 404) {
        message = err.message || "Page not Found";
    } else {
        console.error("Internal Server Error:", err);
    }
    
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080 , () => {
    console.log("server listening at port 8080")
});