angular.module('tappr.beerdetail', [])

.controller('BeerDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http',
        function($scope, $rootScope, $routeParams, $location, $http) {
    $scope.messages = [];

    function init () {
        console.log('INIT', $routeParams);
        if ($routeParams.id) {
            $http({
                method: 'GET',
                url: '//localhost:8001/beer/' + $routeParams.id
            })
                .success(function (data) {
                    $scope.beer = data[0];
                    console.log('beer found: ', data[0]);
                })
                .error(function (error) {
                    console.log('OOPS!', error);
                });
        } else {
            $location.url('/');
        }
    }

    init();

    $rootScope.$on('search', function (event, data) {
        "use strict";
        console.log('SEARCHING: ', event, data);
    });

}]);
