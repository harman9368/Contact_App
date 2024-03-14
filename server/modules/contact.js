const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber1 : {
        type: String,
        required: true,
    },
    phoneNumber2 : {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    address : {
        type: String,
        required: true,
    },
}, {timeStamps: true, collection : "contacts" });

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;