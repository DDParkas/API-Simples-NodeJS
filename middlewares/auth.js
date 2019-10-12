const jwt   = require('jsonwebtoken')
const config = require('../config/config')

const auth = (req, res,  next) => {
    const tokenHeader = req.headers.auth
    if(!tokenHeader) return res.status(401).send({error: 'Token nao enviado'})

    jwt.verify(tokenHeader, config.passTolken, (err, decoded)=>{
        if(err) return res.status(401).send({error: 'Token invalido'})
        res.locals.authData = decoded
        return next()
    })
}

module.exports = auth