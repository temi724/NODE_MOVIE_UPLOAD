const express = require('express')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const router = express.Router()
const { Genre, validate_genre } = require('../models/genremodel')


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
    res.end()
})


router.get('/:id', async (req, res) => {
    const genre_id = await Genre.findById(req.params.id)
    if (!genre_id) return res.status(404).send('There is no genre with the given ID')
    res.send(genre_id)
})


router.post('/', async (req, res) => {
    const { error } = validate_genre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({ name: req.body.name })
    genre = await genre.save()
    res.send(genre)


})

router.put('/:id', async (req, res) => {
    const { error } = validate_genre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre_to_edit_id = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre_to_edit_id) return res.status(404).send("dosent exist")
    res.send(genre_to_edit_id)
})

// delete genre.....
//  [auth, admin], 
router.delete('/:id', async (req, res) => {

    const genre_to_delete = await Genre.deleteOne({ _id: req.params.id })
    if (!genre_to_delete) return res.status(404).send('There is no genre with the Id')
    res.send(genre_to_delete)
})

module.exports = router