const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, required: true, default: "trainee" }
},
    { timestamps: true },
);

module.exports = User = mongoose.model("users", UserSchema);