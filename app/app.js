'use strict';

var app = angular.module('tappr', [
    'ngRoute',
    'ngCookies',
    'tappr.home',
    'tappr.profile',
    'tappr.beersearch',
    'tappr.beerdetail',
    'tappr.services'
]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;

    $routeProvider
        .when('/', {secure: false, controller: 'HomeCtrl', templateUrl: 'scripts/home/home.html'})
        .when('/profile', {secure: true, controller: 'ProfileCtrl', templateUrl: 'scripts/profile/profile.html'})
        .when('/beers', {secure: true, controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/beer-search.html'})
        .when('/beers/:query', {secure: true, controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/beer-search.html'})
        .when('/beers/detail/:id', {secure: true, controller: 'BeerDetailCtrl', templateUrl: 'scripts/beers/beer-detail.html'})
        .otherwise({redirectTo: '/'});
}]);

app.run(['$rootScope', '$location', '$cookieStore', 'configSrc', function ($rootScope, $location, $cookieStore, configSrc) {

    configSrc.checkOverride();

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if (next.$$route.secure && next.$$route.secure === true && !$cookieStore.get('login')) {
            event.preventDefault();
            $location.url('/');
        }
    });

}]);

