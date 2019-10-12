const express   = require("express")
const routes    = express.Router()
const Users     = require('../models/Users')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const auth      = require('../middlewares/auth')
const config    = require('../config/config')

// funçoes auxiliares

const createUserTolken = (userId)=>{
    return jwt.sign({id: userId}, config.passTolken, {expiresIn: config.expiresTolken})
}






routes.get('/', auth, async(req, res)=>{
        console.log(res.locals.authData)
  
        return res.send('informacao da raiz')
})

routes.get('/search-users', async(req, res)=>{
    try{
        const users = await Users.find({})
        return res.send(users)
    }
    catch(err){
        return res.status(500).send('erro ao buscar usuarios')
    }
})

routes.post('/auth', async (req, res)=> {
    const {email, password} = req.body
    if (!email || !password) return res.status(400).send({error: 'dados insuficientes'})
    try {
        const user = await Users.findOne({email}).select('+password')
        if(!user) return res.status(400).send({error: 'usuario nao registrado'})

        const passOk = await bcrypt.compare(password, user.password)

        if(!passOk) return res.status(401).send({error: 'senhas não batem'})

        user.password = undefined
        return res.send({user, tolken: createUserTolken(user.id)})
    } 
    catch (error) {
        return res.status(500).send('Erro ao buscar usuario')
        
    }
})

routes.post('/create-user', async (req, res)=> {
    const {email, password} = req.body
    if(!email || !password) return res.send({error: "Erro dados insuficientes"})
    try {
        if(await Users.findOne({email})) return res.status(400).send({error: 'Usuario ja registrado'})
        const user = await Users.create(req.body)
        user.password = undefined
        return res.status(201).send({user, token: createUserTolken(user.id)})
    } 
    catch (error) {
        return res.send(500).send({error: "erro ao buscar usuario"})
    }
    
})

module.exports = routes

/*
200 - OK
201 - Created
202 - Accepted

400 - Bad request
401 - Unauthorized  -- Autenticação, tem carater temporário
403 - Forbidden     -- Autorização, tem carater permanente
404 - Not found

500 - Internal server error
501 - Not implemented       -- A API não suporta a funcionalidade
502 - Service unavailable   -- A API executa essa operação, mas no momento está indisponivel


*/