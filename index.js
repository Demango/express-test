var express = require('express');
var app = express();

var hbs = require('hbs');
var bodyParser = require('body-parser');

var blogEngine = require('./blog');
var gameApi = require('./gameApi');

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

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.json(entry);
});

app.get('/gamelist/:id', function(req, res) {
    gameApi.getMpGames(req.params.id, function(games) {
        res.json(games);
    });
});

app.get('/user/:id', function(req, res) {
    gameApi.getUser(req.params.id, function(user) {
        res.json(user);
    });
});

/*var next = function(id, counter) {
    if (counter < 100) {
        gameApi.getMpGames(id, function(games) {
            console.log(games.length);
            next(id+1, counter+1);
        });

    }
};
*/
// next(13829935, 0);

app.listen(3000);

/// current min 12887435
