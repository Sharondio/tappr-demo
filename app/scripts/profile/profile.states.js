'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root.profile', {
                url: '',
                abstract: true,

                views: {
                    '@': {templateUrl: 'scripts/common/layouts/default.html'},
                    'header@root.profile': {templateUrl: 'scripts/common/partials/header.html', controller: 'HeaderCtrl'}
                }
            })

            .state('root.profile.view', {
                url: '/profile',
                secure: true,
                views: {
                    'content@root.profile': {templateUrl: 'scripts/profile/views/profile.html', controller: 'ProfileCtrl'},
                    'favorites@root.profile.view': {templateUrl: 'scripts/profile/partials/favorites.html'},
                    'ratings@root.profile.view': {templateUrl: 'scripts/profile/partials/ratings.html'}
                }
            })


    });
