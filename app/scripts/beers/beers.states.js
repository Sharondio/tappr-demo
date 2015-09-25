'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root.beers', {
                url: '',
                abstract: true,

                views: {
                    '@': {templateUrl: 'scripts/common/layouts/default.html'},
                    'header@root': {templateUrl: 'scripts/common/partials/header.html', controller: 'HeaderCtrl'}
                }
            })

            .state('root.beers.search', {
                url: '/beers',
                secure: true,
                views: {
                    'content@root': {
                        templateUrl: 'scripts/beers/views/beer-search.html',
                        controller: 'BeerSearchCtrl',
                        controllerAs: 'search'
                    }
                }
            })


    });
