const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = EmployeeModel;
