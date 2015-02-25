var app = angular.module('app', ['ngRoute']);

app.controller('AppController', function($http, $routeParams, $scope) {

    this.articles = [];
    this.article = null;
    this.selectedArticle = null;

    this.gamesData = [];
    this.players = [];

    this.mp = null;

    var self = this;

    this.loadArticles = function() {
        $http.get('/articles').then(function(res) {
            self.articles = res.data;
        });
    };

    this.loadArticle = function() {
        $http.get('/article/' + $routeParams.id).then(function(res) {
            console.log(res);
            self.article = res.data;
        });
    };

    this.loadGames = function() {
        $http.get('/gamelist/' + this.mp).then(function(res) {
            self.gamesData = res.data;
            self.gamesData.games.forEach(function(item) {
                item.scores.forEach(function(score) {
                    var player = _.findWhere(self.players, {id: score.user_id});
                    if (player) {
                        player.playCount++;
                    } else {
                        self.players.push(
                            {
                                id: score.user_id,
                                playCount: 1
                            }
                        );
                    }
                });
                self.loadUsernames();
            });
        });
    };

    this.checkGames = function() {
        for (var i = 0; i >= 0; i++) {
            $http.get('/gamelist/' + i).then(function(res) {
                self.gamesData = res.data;
                console.log(self.gamesData.match);
            });
        };
    };

    this.loadUsernames = function(id) {
        this.players.forEach(function(player) {
            $http.get('/user/' + player.id).then(function(res) {
                var user = res.data;
                player.username = user.username;
            });
        });
    };

    this.resetPlayers = function() {
        self.players = [];
    };
});

app.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'templates/article/index.html',
            controller: 'AppController',
            controllerAs: 'app'
        }).
        when('/article/:id', {
            templateUrl: 'templates/article/article.html',
            controller: 'AppController',
            controllerAs: 'app'
        }).
        when('/games/', {
            templateUrl: 'templates/games/games.html',
            controller: 'AppController',
            controllerAs: 'app',
        }).
        when('/finder', {
            templateUrl: 'templates/games/finder.html',
            controller: 'AppController',
            controllerAs: 'app',
        }).
        otherwise({
            redirectTo: '/'
        });
});