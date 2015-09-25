'use strict';

angular.module('tappr')
    .config(function ($stateProvider) {

        $stateProvider

            .state('root.home', {
                url: '/',
                secure: false,
                views: {
                    'content@root': { templateUrl: 'scripts/home/views/home.html', controller: 'HomeCtrl'}
                }
            })


    });
