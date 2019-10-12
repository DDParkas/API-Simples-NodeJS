const express       = require("express")
const app           = express()
const routes        = require('./routes')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const config        = require('../config/config')

const options = { 
    reconnectTries:     Number.MAX_VALUE, 
    reconnectInterval:  500, 
    poolSize:           5, 
    useNewUrlParser:    true, 
    useUnifiedTopology: true
}

mongoose.connect(config.bdString,options)

// DEBUG BANCO
mongoose.connection.on('error', (err)=>{
    console.log('Erro de conexao com o banco de dados: '+ err)
})
mongoose.connection.on('disconnected', ()=>{
    console.log('Aplicacao desconectada')
})
mongoose.connection.on('connected', ()=>{
    console.log('Aplicacao conectada corretamente')
})


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(routes);
module.exports = app

app.listen(3333)