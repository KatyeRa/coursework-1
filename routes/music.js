const { Router } = require('express')
const Music = require('../models/Music')
const Blog = require('../models/Blog')
const Review = require('../models/Review')
const router = Router()

router.get('/', async (req,res) => {
    //const portfolios = await Portfolio.find({}).lean()

    res.render('index',{
        title:'Главная',
        isIndex: true,
        //portfolios
    })
})


router.post('/', async (req, res) => {
    const music = new Music({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        duration: req.body.duration
    })

    await music.save()
    res.redirect('/')
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'О нас'
    })
})

router.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Блог'
    })
})

router.post('/blog', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
    })

    await blog.save()
    res.redirect('/')
})

router.get('/reviews', (req, res) => {
    res.render('reviews', {
        title: 'Отзывы'
    })
})

module.exports = router