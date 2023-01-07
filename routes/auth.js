const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Joi = require('joi')
const { User } = require('../models/usermodel')




// router.get('/', async(req, res) => {
//     const users = await User.find().sort('name')
//     res.send(users)
//     res.end()
// })

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status('400').send('Invalid email or password')
    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()

    res.send(token)


})

function validate(req) {
    const schema = {
        email: Joi.string(),
        password: Joi.string().required()
    }
    return Joi.validate(req, schema)
}




module.exports = router