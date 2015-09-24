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

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {secure: false, controller: 'HomeCtrl', templateUrl: 'scripts/home/home.html'})
        .when('/profile', {secure: true, controller: 'ProfileCtrl', templateUrl: 'scripts/profile/profile.html'})
        .when('/beers', {secure: true, controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/beer-search.html'})
        .when('/beers/:query', {secure: true, controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/beer-search.html'})
        .when('/beers/detail/:id', {secure: true, controller: 'BeerDetailCtrl', templateUrl: 'scripts/beers/beer-detail.html'})
        .otherwise({redirectTo: '/'});
}]);

app.run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if (next.$$route.secure && next.$$route.secure === true && !$cookieStore.get('login')) {
            event.preventDefault();
            $location.url('/');
        }
    });

}]);

app.controller('HeaderCtrl', function ($scope, $location, $rootScope, messageSrc, $cookieStore, $route) {
    console.log('initing HeaderCtrl');

    if ($cookieStore.get('login')) {
        $scope.user = $cookieStore.get('login');
        $rootScope.user = $cookieStore.get('login');
    }

    $scope.isActive = function (view) {
        return (view === $location.path());
    };

    $scope.search = function () {
        console.log('SEARCHING: ', $scope.query);
        $rootScope.query = $scope.query;
        $location.url('/beers/' + $scope.query);
        $route.reload()
    };

    $scope.logout = function () {
        $cookieStore.remove('login');
        $scope.user = {};
        $rootScope.user = {};
        $location.url('/');
    };

});
