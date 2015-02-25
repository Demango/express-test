var app = angular.module('app', ['ngRoute']);

app.controller('AppController', function($http, $routeParams) {

    this.articles = [];
    this.article = null;
    this.selectedArticle = null;

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
        otherwise({
            redirectTo: '/'
        });
});