var express = require('express');
var app = express();

var hbs = require('hbs');
var bodyParser = require('body-parser');

var blogEngine = require('./blog');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(bodyParser());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {title:"My Blog"});
});

app.get('/articles', function(req, res) {
    res.json(blogEngine.getBlogEntries());
});

app.get('/new', function(req, res) {
    res.render('new', {title:"New Post"});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.json(entry);
});

app.listen(3000);