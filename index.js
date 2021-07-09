const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')

//const musicRoutes = require('./routes/music.js')
//const authRouter = require('./routes/authRouter.js')

const PORT = process.env.PORT || 3000

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'image')))

app.use(express.json())

//app.use(musicRoutes)
//app.use(authRouter)

async function start() {
    try{
        await mongoose.connect(
            'mongodb+srv://KatyeRa:1qazxsw2@music.ajb5f.mongodb.net/music',
            {
                useNewUrlParser: true,
                useFindAndModify: false
            }
        )
        app.listen(PORT, () => {
            console.log("Server has been started...")
        })
    } catch(e){
        console.log(e)
    }
}

start()