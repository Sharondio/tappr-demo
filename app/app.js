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

    .config(function ($urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

    })

    .run(['$rootScope', '$state', '$cookieStore', function ($rootScope, $state, $cookieStore) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            //Check to see if the person is logged in
            if (toState.secure && !$cookieStore.get('login') ) {
                event.preventDefault();
                $state.go( 'root.home' );
            }

        });

    }]);
