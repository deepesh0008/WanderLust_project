const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    url : String,
    filename : String
    // url: {
    //   type: String,
    //   default: "https://images.unsplash.com/photo-1501876725168-00c445821c9e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9tZSwgcm9vZnRvcCxhZXN0aGV8fHx8fHwxNzEzMzQ5NzQ2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    //   set:(v)=>v===""?"https://images.unsplash.com/photo-1501876725168-00c445821c9e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9tZSwgcm9vZnRvcCxhZXN0aGV8fHx8fHwxNzEzMzQ5NzQ2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600":v,
    // },
    // filename: {
    //   type: String,
    //   default: "listingimage",
    // }
  },
  description: String,
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    },
  ],
  owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  geometry: {
    type: {
      type: String,              // Don't do `{ location: { type: String } }`
      enum: ['Point'],              // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

listingSchema.post("findOneAndDelete" , async(listing) => {
  if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;