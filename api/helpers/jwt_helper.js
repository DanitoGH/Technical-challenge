const JWT = require('jsonwebtoken')

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '7d',
                issuer: 'danito.com',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) return reject(err)
                resolve(token)
            })
        })
    }
}