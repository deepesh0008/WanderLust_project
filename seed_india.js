require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderLust";

main()
    .then(() => {
        console.log("Connected to DB for Seeding");
    })
    .catch((err) => {
        console.log(err);   
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const sampleData = [
    {
        title: "Cottage in Dadri",
        description: "Experience authentic rural life with modern amenities.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGh1dHxlbnwwfHx8fDE3MTI0ODgzMDF8MA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 5330,
        location: "Gautam Buddha Nagar",
        country: "India",
        geometry: { type: "Point", coordinates: [77.5385, 28.3670] }
    },
    {
        title: "Flat in Greater Noida",
        description: "Luxurious stay in the heart of Greater Noida.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGludGVyaW9yJTIwYXBhcnRtZW50fGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 4100,
        location: "Gautam Buddha Nagar",
        country: "India",
        geometry: { type: "Point", coordinates: [77.5385, 28.3670] }
    },
    {
        title: "Farm stay in Greater Noida",
        description: "Enjoy peaceful farm life near the city.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHByaXZhdGUlMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzEyNDg4MzAxfDA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 34236,
        location: "Gautam Buddha Nagar",
        country: "India",
        geometry: { type: "Point", coordinates: [77.5385, 28.3670] }
    },
    {
        title: "Flat in Noida",
        description: "Modern apartment with beautiful views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1502672260266-1c1cd2cb4442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fGludGVyaW9yJTIwYXBhcnRtZW50fGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 8293,
        location: "Gautam Buddha Nagar",
        country: "India",
        geometry: { type: "Point", coordinates: [77.5385, 28.3670] }
    },

    {
        title: "Flat in Gurugram",
        description: "High-rise flat with excellent amenities.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDd8fGludGVyaW9yJTIwYXBhcnRtZW50fGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 7532,
        location: "Gurgaon District",
        country: "India",
        geometry: { type: "Point", coordinates: [77.0266, 28.4595] }
    },
    {
        title: "Villa in Gurugram",
        description: "Luxurious villa in a serene locality.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDEzfHxtYW5zaW9ufGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 15975,
        location: "Gurgaon District",
        country: "India",
        geometry: { type: "Point", coordinates: [77.0266, 28.4595] }
    },
    {
        title: "Place to stay in Gurugram",
        description: "Cozy stay near Cyber Hub.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fGJlZHJvb218ZW58MHx8fHwxNzEyNDg4MzAxfDA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 2979,
        location: "Gurgaon District",
        country: "India",
        geometry: { type: "Point", coordinates: [77.0266, 28.4595] }
    },

    {
        title: "Flat in Pune City",
        description: "Minimalist flat with modern amenities.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDEyfHxpbnRlcmlvciUyMGFwYXJ0bWVudHxlbnwwfHx8fDE3MTI0ODgzMDF8MA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 5000,
        location: "Pune",
        country: "India",
        geometry: { type: "Point", coordinates: [73.8567, 18.5204] }
    },
    {
        title: "Home in Pune City",
        description: "Cozy home with a beautiful garden.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGJlZHJvb218ZW58MHx8fHwxNzEyNDg4MzAxfDA&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 10613,
        location: "Pune",
        country: "India",
        geometry: { type: "Point", coordinates: [73.8567, 18.5204] }
    },
    {
        title: "Home in Mohammadwadi",
        description: "Spacious house located in a quiet neighborhood.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGludGVyaW9yJTIwYXBhcnRtZW50fGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 8180,
        location: "Pune",
        country: "India",
        geometry: { type: "Point", coordinates: [73.8567, 18.5204] }
    },
    {
        title: "Shipping container in Mohammadwadi",
        description: "Unique stay in a converted shipping container.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fGNhYmlufGVufDB8fHx8MTcxMjQ4ODMwMXww&ixlib=rb-4.0.3&q=80&w=2000"
        },
        price: 20083,
        location: "Pune",
        country: "India",
        geometry: { type: "Point", coordinates: [73.8567, 18.5204] }
    }
];

const seedDB = async () => {
    // Add owner ID
    const ownerId = "6617ea6d60a0720f1dbf48d3"; 
    
    const formattedData = sampleData.map((obj) => ({
        ...obj,
        owner: ownerId,
    }));
    
    await Listing.insertMany(formattedData);
    console.log("Newly added realistic properties to DB!");
    process.exit();
}
seedDB();
