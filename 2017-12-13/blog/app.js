const express = require('express')
const app = express()
const posts = require('./posts')
app.set('view engine', 'pug')
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.render('index', getPosts(1))
})

app.get('/page/:paged', (req, res) => {
  res.render('index', getPosts(Number(req.params.paged)))
})

function getPosts(page) {
  return {
    title: 'The blog',
    posts: posts.slice((page - 1) * 2, page * 2),
    next: page * 2 < posts.length ? page + 1 : false
  }
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
