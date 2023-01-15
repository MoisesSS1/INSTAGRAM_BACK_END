

async function checkToken(req,res,next) {
    const Authorization = await req.headers.authorization
    const token = await Authorization.split(' ')[1]
    
    const checkUserToken = await jwt.decode(token)

    



       
}

module.exports = {checkToken}