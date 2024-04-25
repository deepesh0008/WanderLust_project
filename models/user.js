const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

//Passport-local-mongoose will add username , hash , salt feild to store the username ,
// the hashed password and the salt value.....
const userSchema = new Schema ({
    email : {
        type : String,
        required : true
    }
});

userSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("User" , userSchema);