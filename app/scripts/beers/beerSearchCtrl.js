angular.module('tappr.beersearch', [])

.controller('BeerSearchCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('BeerSearchCtrl is initted');
    }

    init();

    $rootScope.$on('search', function (event, data) {
        "use strict";
        console.log('SEARCHING from beerSearchCtrl: ', event, data);
        $http({
            method: 'GET',
            url: '//localhost:8001/beer',
            data: {query: data}
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
