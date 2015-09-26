'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root.breweries', {
                url: '/breweries',
                secure: true,
                views: {
                    'content@root.beers': {
                        templateUrl: 'scripts/beers/views/beer-search.html',
                        controller: 'BeerSearchCtrl',
                        controllerAs: 'search'
                    }
                }
            })

    });
