require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderLust";

main()
    .then(() => {
        console.log("Connected to DB for Update");
    })
    .catch((err) => {
        console.log(err);   
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const sampleData = [
    {
        title: "Luxury Suite in Mumbai",
        description: "Experience the vibrant city life from a luxurious high-rise suite.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDEwfHxob3RlbCUyMHJvb218ZW58MHx8fHwxNzEyNDg4MzAxfDA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 15500,
        location: "Mumbai",
        country: "India",
        geometry: { type: "Point", coordinates: [72.8777, 19.0760] }
    },
    {
        title: "Heritage Hotel in Jaipur",
        description: "Live like royalty in this beautifully restored heritage property.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGhlcml0YWdlJTIwaG90ZWx8ZW58MHx8fHwxNzEyNDg4MzAxfDA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 12000,
        location: "Jaipur",
        country: "India",
        geometry: { type: "Point", coordinates: [75.7873, 26.9124] }
    },
    {
        title: "Beachside Villa in Goa",
        description: "Relax by the private pool with direct access to the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGJlYWNoJTIwaG91c2V8ZW58MHx8fHwxNzEyNDg4MzAxfDA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 25000,
        location: "Goa",
        country: "India",
        geometry: { type: "Point", coordinates: [73.8180, 15.2993] }
    },
    {
        title: "Cozy Cottage in Manali",
        description: "A perfect winter retreat surrounded by snow-capped mountains.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fGNhYmlufGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 6500,
        location: "Manali",
        country: "India",
        geometry: { type: "Point", coordinates: [77.1887, 32.2396] }
    },
    {
        title: "Modern Apartment in Bangalore",
        description: "Stay in the IT hub with top-notch facilities and city views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGludGVyaW9yJTIwYXBhcnRtZW50fGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 5200,
        location: "Bangalore",
        country: "India",
        geometry: { type: "Point", coordinates: [77.5946, 12.9716] }
    },
    {
        title: "Serene Houseboat in Kerala",
        description: "Experience the tranquil backwaters of Kerala.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1593693397690-362cb9666cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGhvdXNlYm9hdHxlbnwwfHx8fDE3MTI0ODgzMDF8MA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 18000,
        location: "Kerala",
        country: "India",
        geometry: { type: "Point", coordinates: [76.2711, 9.9312] }
    }
];

const updateDB = async () => {
    // 1. Delete the "Beach cost" listing
    const deleted = await Listing.deleteMany({ title: "Beach cost" });
    console.log(`Deleted ${deleted.deletedCount} unwanted listings.`);

    // 2. Add more new realistic properties
    const ownerId = "6617ea6d60a0720f1dbf48d3"; 
    const formattedData = sampleData.map((obj) => ({
        ...obj,
        owner: ownerId,
    }));
    
    await Listing.insertMany(formattedData);
    console.log(`Added ${sampleData.length} new realistic properties to DB!`);
    
    process.exit();
}

updateDB();
