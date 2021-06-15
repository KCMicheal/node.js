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
    res.sendFile('./views/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    console.log('connected!!!')
    // res.send('<p>about page</p>');
    res.sendFile('./views/about.html', { root: __dirname })
})

//redirects
app.get('/about-us', (req, res) => {
    console.log('connected!!!')
    // res.send('<p>about page</p>');
    res.redirect('/about')
})

//404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname })
})