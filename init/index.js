const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Database create karne ke liye....
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);   
    });
async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});     // phele ke pure data ko database se clear kar do.....
    initData.data = initData.data.map((obj) => ({ ...obj , owner : "6617ea6d60a0720f1dbf48d3"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();