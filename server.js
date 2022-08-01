const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true })
console.log('Connected!')

const path = __dirname + '/views/'

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/articles', articleRouter)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
    createdOn: 'desc'})
    res.render('articles/index', { articles: articles })
})

console.log('Listening on port 3000...');
app.listen(3000);
