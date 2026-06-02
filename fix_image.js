require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderLust";

main()
    .then(() => console.log("Connected to DB for Fixing Images"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const fixImages = async () => {
    // Some unsplash source urls might be broken, let's update specific ones or add reliable fallbacks
    const reliableImages = [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
        "https://images.unsplash.com/photo-1502672260266-1c1cd2cb4442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
    ];

    // Find "Flat in Noida" and update it
    const flatInNoida = await Listing.findOne({ title: "Flat in Noida" });
    if (flatInNoida) {
        flatInNoida.image.url = reliableImages[0];
        await flatInNoida.save();
        console.log("Fixed 'Flat in Noida' image.");
    }
    
    // We can also find any listings with generic unsplash source that might be failing and replace them
    const allListings = await Listing.find({});
    let i = 0;
    for (let listing of allListings) {
        if (!listing.image.url || listing.image.url.includes("source.unsplash.com") || listing.image.url.includes("ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fGludGVyaW9yJTIwYXBhcnRtZW50fGVufDB8fHx8MTcxMjQ4ODMwMXww")) {
            listing.image.url = reliableImages[i % reliableImages.length];
            await listing.save();
            i++;
        }
    }
    console.log("Checked and fixed other broken links.");
    
    process.exit();
}

fixImages();
