require('dotenv').config()
const jwt = require('jsonwebtoken')
// let key = process.env.tnp_key
const mongoose = require('mongoose')
const Joi = require('joi')
let key = process.env.mv_key


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
        maxlength: 1024

    },
    phoneNumber: {
        type: String,
        required: true,
        maxlength: 20

    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    dateOfRegistration: {
        type: Date
    }

})


//This method generate user security token for confirmation on login...
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        name: this.firstName,
        email: this.email
    }, key)
    return token

}

const User = mongoose.model('User', userSchema)

function validate_user(user) {
    const schema = {
        email: Joi.string().required().email(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        age: Joi.string().required(),
        isAdmin: Joi.boolean()

        // isAdmin: Joi.boolean()
    }
    return Joi.validate(user, schema)
}



exports.User = User
exports.validate_user = validate_user