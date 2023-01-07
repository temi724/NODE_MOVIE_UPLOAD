const express = require('express')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')

const router = express.Router()
const { Movies, validate_movie } = require('../models/moviesmodel')
const storage = require('../lib/multer')
const cloudinary = require('../lib/cloudinary')
const dateOftoday = new Date().toJSON().slice(0, 10);
const uploadVideo = (req, res) => {
    cloudinary.uploader.upload(req.file.path,
        {
            resource_type: "video",
            folder: "video",
        },

        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            var upload = new Movies({
                // name: req.file.originalname,
                title: req.body.title,
                movieDetails: req.body.MovieDetails,
                producer: req.body.producer,
                movieRating: req.body.movieRating,
                genre: req.body.genre,

                pathUrl: result.url,
                cloudinaryIdString: result.public_id,
                publisher: req.body.publisher,
                dateOfMovieUpload: dateOftoday

            });
            upload.save((err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                return res.status(200).send(result);
            }
            );
        }
    );
}

router.get('/', async (req, res) => {
    const movies = await Movies.find().sort('title')
    res.send(movies)
    res.end()
})

router.get('/:id', async (req, res) => {
    const movies_id = await Movies.findById(req.params.id)
    if (!movies_id) return res.status(404).send('movie not valid')
    res.send(movies_id)
})
router.get('/:title', async (req, res) => {
    const movies_by_title = await Movies.findOne(req.params.title)
    if (!movies_by_title) return res.status(404).send('movie not valid')
    res.send(movies_id)
})
//[auth, admin]
router.post('/', storage.single('file'), uploadVideo)

router.delete('/:id', [admin], async (req, res) => {

    const movie_delete = await Movies.deleteOne({ _id: req.params.id })
    if (!movie_delete) return res.status(404).send('There is no movie  with the Id')
    res.send(movie_delete)
})



module.exports = router


