const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User, validate_user } = require('../models/usermodel')
const auth = require('../middleware/auth')


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)

})

router.get('/', async (req, res) => {
    const users = await User.find().select('-password')
    res.send(users)
    res.end()
})

router.post('/', async (req, res) => {
    const { error } = validate_user(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status('400').send('Email already exist')

    const dateOftoday = new Date().toJSON().slice(0, 10);
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        dateOfRegistration: dateOftoday,
        phoneNumber: req.body.phoneNumber,

        isAdmin: req.body.isAdmin
    })
    const salt = await bcrypt.genSalt(10)
    // hashing the password...
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()

    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({
            firstName: user.firstName,
            email: user.email
        })


})



module.exports = router