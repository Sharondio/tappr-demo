'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root.breweries', {
                url: '',
                abstract: true,

                views: {
                    '@': {templateUrl: 'app/modules/shared/layouts/layout-main.html'},
                    'header@root': {
                        templateUrl: 'app/modules/shared/partials/header.html',
                        controller: 'HeaderCtrl',
                        controllerAs: 'breweries'
                    }

                }
            })


    });
