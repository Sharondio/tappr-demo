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
        .when('/', {secure: false, controller: 'HomeCtrl', templateUrl: 'scripts/home/home.html'})
        .when('/profile', {secure: true, controller: 'ProfileCtrl', templateUrl: 'scripts/profile/profile.html'})
        .when('/beers', {secure: true, controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/beer-search.html'})
        .when('/beers/:id', {secure: true, controller: 'BeerDetailCtrl', templateUrl: 'scripts/beers/beer-detail.html'})
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

app.controller('HeaderCtrl', function ($scope, $location, $timeout, $rootScope, $cookieStore) {
    console.log('initing HeaderCtrl');

    if ($cookieStore.get('login')) {
        $scope.user = $cookieStore.get('login');
        $rootScope.user = $cookieStore.get('login');
    }

    $scope.isActive = function (view) {
        return (view === $location.path());
    };

    $scope.search = function () {
        console.log('HeaderCtrl: search: ', $scope.query);
        // Getting the search query data to the search controller
        $location.url('/beers');
        $rootScope.query = $scope.query;
        // Have to delay sending the query because the other controller has to be loaded.
        $timeout(function () {
            $rootScope.$broadcast('search', $scope.query);
        }, 50);
    };

    $scope.logout = function () {
        $cookieStore.remove('login');
        $scope.user = {};
        $rootScope.user = {};
        $location.url('/');
    };

});
