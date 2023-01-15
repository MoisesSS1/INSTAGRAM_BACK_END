const jwt = require('jsonwebtoken')

async function checkUserForToken(req) {
    const Authorization = await req.headers.authorization
    const token = await Authorization.split(' ')[1]
    
    const UserId = await jwt.decode(token)

    return UserId
}

module.exportst = checkUserForToken