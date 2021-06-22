const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:adgjmptw@sandbox.yboau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

//middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})



app.get('/', (req, res) => {
    const blogs = [
        { title: "Yoshi masters", snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: "Yoshi masters", snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: "Yoshi masters", snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    console.log('connected!!!');
    // res.send('<p>home page</p>');
    res.render('index', { title: 'Home', blogs });
});


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