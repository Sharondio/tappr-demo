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

app.controller('HeaderCtrl', function ($scope, $location, $timeout, $rootScope, $cookieStore) {
    console.log('initing HeaderCtrl');

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        if (!$cookieStore.get('login')) {
            console.log( event, next, current );
            //event.preventDefault();
            //$location.url('/');
        }
    });

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
