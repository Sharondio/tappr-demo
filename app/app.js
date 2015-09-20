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

app.controller('HeaderCtrl', function ($scope, $location, $timeout, $rootScope) {
    console.log('initing HeaderCtrl');

    $scope.isActive = function (view) {
        return (view === $location.path());
    };

    $scope.search = function () {
        console.log('HeaderCtrl: search: ', $scope.query);

        // Getting the search query data to the search controller
        $location.url('/beers');
        // Have to delay sending the query because the other controller has to be loaded.
        $timeout(function () {
            $rootScope.$broadcast('search', $scope.query);
        }, 50);
    }
});