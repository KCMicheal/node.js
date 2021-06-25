const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:adgjmptw@sandbox.yboau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000)
        //console.log('connected to db')
        )
    .catch((err) => console.log(err))
    
//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('60d45b25666cd30d84ee1b0e')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

//routes
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})



app.get('/', (req, res) => {
    res.redirect('/blogs')
});


app.get('/about', (req, res) => {
    console.log('connected!!!')
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About'})
})

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err)
        })
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