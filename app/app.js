'use strict';

var app = angular.module('tappr', [
    'ngRoute',
    'ngCookies',
    'tappr.home',
    'tappr.profile',
    'tappr.beersearch',
    'tappr.beerdetail'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {controller: 'HomeCtrl', templateUrl: 'scripts/home/home.html'})
        .when('/profile', {controller: 'ProfileCtrl', templateUrl: 'scripts/profile/profile.html'})
        .when('/beers', {controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/search.html'})
        .when('/beers/:id', {controller: 'BeerDetailCtrl', templateUrl: 'scripts/beers/detail.html'})
        .otherwise({redirectTo: '/'});
}]);
