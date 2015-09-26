'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root.beers', {
                url: '',
                abstract: true,

                views: {
                    '@': {templateUrl: 'scripts/common/layouts/default.html'},
                    'header@root.beers': {
                        templateUrl: 'scripts/common/partials/header.html',
                        controller: 'HeaderCtrl',
                        controllerAs: 'header'
                    }
                }
            })

            .state('root.beers.search', {
                url: '/beers',
                secure: true,
                views: {
                    'content@root.beers': {
                        templateUrl: 'scripts/beers/views/beer-search.html',
                        controller: 'BeerSearchCtrl',
                        controllerAs: 'search'
                    }
                }
            })

            .state('root.beers.detail', {
                url: '/beers/detail/{id}',
                secure: true,
                views: {
                    'content@root.beers': {
                        templateUrl: 'scripts/beers/views/beer-detail.html',
                        controller: 'BeerDetailCtrl',
                        controllerAs: 'detail'
                    }
                }
            })


    });
