const mongoose = require('mongoose')

const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // minlength: 5,
        maxlength: 50
    }
})
const Genre = mongoose.model('Genre', genreSchema)


function validate_genre(genre) {
    const schema = {
        name: Joi.string().min(4).required()
    }
    return Joi.validate(genre, schema)
}

exports.Genre = Genre
exports.validate_genre = validate_genre
exports.genreSchema = genreSchema