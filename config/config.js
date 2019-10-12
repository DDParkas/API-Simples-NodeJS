const env = process.env.NODE_ENV || 'dev'

const config = () => {
    switch(env){
        case 'dev':
            return{
                bdString: 'mongodb+srv://omnistack:omnistack@omnistack-nu04f.mongodb.net/semana09?retryWrites=true&w=majority',
                passTolken: 'senhaRidicula',
                expiresTolken: '7d'
            }
        case 'hml':
            return{
                bdString: 'mongodb+srv://omnistack:omnistack@omnistack-nu04f.mongodb.net/semana09?retryWrites=true&w=majority'
            }
        case 'prod':
            return{
                bdString: 'mongodb+srv://omnistack:omnistack@omnistack-nu04f.mongodb.net/semana09?retryWrites=true&w=majority'
            }
    }
}
console.log(`Iniciando a API em ${env.toUpperCase()}`)

module.exports = config()