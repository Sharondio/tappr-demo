'use strict';

// sub-module definitions
angular.module('tappr.home', []);
angular.module('tappr.beers', []);
angular.module('tappr.profile', []);
angular.module('tappr.common', []);

angular.module('tappr', [
    'ngRoute',
    'ngCookies',
    'tappr.home',
    'tappr.beers',
    'tappr.profile',
    'tappr.common'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {secure: false, controller: 'HomeCtrl', controllerAs: 'home', templateUrl: 'scripts/home/home.html'})
            .when('/profile', {secure: true, controller: 'ProfileCtrl', controllerAs: 'profile', templateUrl: 'scripts/profile/profile.html'})
            .when('/beers', {secure: true, controller: 'BeerSearchCtrl', controllerAs: 'search', templateUrl: 'scripts/beers/beer-search.html'})
            .when('/beers/:query', {secure: true, controller: 'BeerSearchCtrl', controllerAs: 'search', templateUrl: 'scripts/beers/beer-search.html'})
            .when('/beers/detail/:id', {secure: true, controller: 'BeerDetailCtrl', controllerAs: 'detail', templateUrl: 'scripts/beers/beer-detail.html'})
            .otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            if (next.$$route.secure && next.$$route.secure === true && !$cookieStore.get('login')) {
                event.preventDefault();
                $location.url('/');
            }
        });

    }]);
