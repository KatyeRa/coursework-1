const { Router } = require('express')
const Music = require('../models/Music')
const Blog = require('../models/Blog')
const Review = require('../models/Review')
const router = Router()

router.get('/', async (req,res) => {
    const musics = await Music.find({}).lean()

    res.render('index',{
        title:'Главная',
        musics
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

router.get('/blog', async(req, res) => {
    const blogs = await Blog.find({}).lean()

    res.render('blog', {
        title: 'Блог',
        blogs
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

router.get('/review', async(req, res) => {
    const reviews = await Review.find({}).lean()

    res.render('review', {
        title: 'Отзывы',
        reviews
    })
})

router.post('/review', async (req, res) => {
    const review = new Review({
        author: req.body.author,
        text: req.body.text
    })

    await review.save()
    res.redirect('/')
})

module.exports = router