const mongoose = require('mongoose')
const Joi = require('joi')


const Movies = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        required: true
    },
    movieDetails: {
        type: String,
        maxlength: 20,
        // required: true
    },
    publisher: {
        type: String,
        // required: true
    },
    producer: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    // genre: {
    //     type: new mongoose.Schema({
    //         name: {
    //             type: String,
    //             required: true
    //         }
    //     })
    //     // required: true

    // },
    movieRating: {
        type: Number,
        required: true

    },
    pathUrl: {
        type: String,
    },
    cloudinaryIdString: {
        type: String,

    },
    dateOfMovieUpload: {
        type: Date
    }

}))

// function validate_movie(movie) {
//     const schema = {
//         title: Joi.string().min(4).required(),
//         numberInStock: Joi.number().required(),
//         dailyRentalRate: Joi.number().required(),
//         genreId: Joi.string().required()
//     }
//     return Joi.validate(movie, schema)
// }

exports.Movies = Movies
// exports.validate_movie = validate_movie