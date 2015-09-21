angular.module('tappr.profile', [])

.controller('ProfileCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.messages = [];
    $scope.user = {};

    function init () {
        console.log('INIT');
        //get ratings
        $http({
            method: 'GET',
            url: '//localhost:8001/user/SharonDio/rating'
        })
            .success(function (data) {
                $scope.user.ratings = data;
                console.log( data );
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });
        //get favorites
        $http({
            method: 'GET',
            url: '//localhost:8001/user/SharonDio/favorite'
        })
            .success(function (data) {
                $scope.user.favorites = data;
                console.log( data );
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });
    }

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
