const express = require('express');
//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    console.log('connected!!!')
    // res.send('<p>home page</p>');
    res.render('index', { title: 'Home'})
})

app.get('/about', (req, res) => {
    console.log('connected!!!')
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog'})
})

//redirects
app.get('/about-us', (req, res) => {
    console.log('connected!!!')
    // res.send('<p>about page</p>');
    res.redirect('/about')
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})