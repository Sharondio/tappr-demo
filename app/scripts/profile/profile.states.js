'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root.profile', {
                url: '/profile',
                secure: true,
                views: {
                    'content@root.profile': {
                        templateUrl: 'scripts/profile/views/profile.html',
                        controller: 'ProfileCtrl',
                        controllerAs: 'profile'
                    },
                    'favorites@root.profile.view': {
                        templateUrl: 'scripts/profile/partials/favorites.html'
                    },
                    'ratings@root.profile.view': {
                        templateUrl: 'scripts/profile/partials/ratings.html'
                    }
                }
            })


    });
