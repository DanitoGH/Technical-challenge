const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.models')
const { authSchema }  = require('../helpers/validation_schema')
const { signAccessToken }  = require('../helpers/jwt_helper')

router.post('/register', async (req, res, next) => {
    try { 
        const result = await authSchema.validateAsync(req.body)
    
        const doesExist = await User.findOne({ phone_number: result.phone_number })
        if(doesExist) throw createError.Conflict(`This number ${result.phone_number} has already been registerd.`)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)

        res.send({accessToken})
    }catch(error) {
        // Prevent Joi from throwing false internal error status
       if(error.isJoi === true) error.status = 422
       // Forward the error to the internal server error handler
       next(error)
    }
})

module.exports = router