'use strict';

// sub-module definitions
angular.module('tappr.home', []);
angular.module('tappr.beers', []);
angular.module('tappr.profile', []);
angular.module('tappr.common', []);

angular.module('tappr', [
    'ui.router',
    'ngCookies',
    'tappr.home',
    'tappr.beers',
    'tappr.profile',
    'tappr.common'
])
/*
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/profile', {secure: true, controller: 'ProfileCtrl', templateUrl: 'scripts/profile/profile.html'})
            .when('/beers', {secure: true, controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/beer-search.html'})
            .when('/beers/:query', {secure: true, controller: 'BeerSearchCtrl', templateUrl: 'scripts/beers/beer-search.html'})
            .when('/beers/detail/:id', {secure: true, controller: 'BeerDetailCtrl', templateUrl: 'scripts/beers/beer-detail.html'})
            .otherwise({redirectTo: '/'});
    }])
*/
    .run(['$rootScope', '$state', '$cookieStore', function ($rootScope, $state, $cookieStore) {


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            //Check to see if the person is logged in
            if (toState.secure && !$cookieStore.get('login') ) {
                event.preventDefault();
                $state.go( 'root.home' );
            }

        });

    }]);
