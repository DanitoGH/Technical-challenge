const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserScheme = new Schema({
    phone_number: {
       type: Number,
       required: true,
       unique: true
    },
    password: {
        type: String,
        required: true
    }
})
/**
 * Hash password when the save middleware is invoked
 */
UserScheme.pre('save', async function (next) {
    try {
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(this.password, salt)
       this.password = hashedPassword
       next()
    } catch (error) {
      next(error)
    }
})

const User = mongoose.model('user', UserScheme)
module.exports = User