angular.module('tappr.profile', [])

.controller('ProfileCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.messages = [];
    $scope.user = {};

    function init () {
        console.log('INIT');
        $scope.messages.push('ProfileCtrl is initted');
    }

    $http({
            method: 'GET',
            url: '//localhost:8001/user/SharonDio'
        })
        .success(function (data) {
            $scope.user = data;
            console.log( data );
        })
        .error(function (error) {
            console.log('OOPS!', error);
        });

    init();

    $rootScope.$on('search', function (event, data) {
        "use strict";
        console.log('SEARCHING: ', event, data);
        $http({
            method: 'GET',
            url: '//localhost:8001/beers'
        })
            .success(function (data) {
                $scope.beers = data;
                console.log('beers found: ', data);
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });
    });

}]);
