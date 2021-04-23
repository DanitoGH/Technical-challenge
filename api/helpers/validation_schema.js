const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    phone_number: Joi.number().integer().min(10).required(),
    password: Joi.string().min(2).required(),
})
/**
 * Place other schemas in the module exports object.
 */
module.exports = {
    authSchema,
}