'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root', {
                url: '',
                abstract: true,

                views: {
                    '@': {templateUrl: 'scripts/common/layouts/default.html'},
                    'header@root': {
                        templateUrl: 'scripts/common/partials/header.html',
                        controller: 'HeaderCtrl',
                        controllerAs: 'header'
                    }
                }
            })


    });
