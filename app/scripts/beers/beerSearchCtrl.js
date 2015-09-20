angular.module('tappr.beersearch', [])

.controller('BeerSearchCtrl', ['$scope', '$rootScope', '$http', '$location',
        function($scope, $rootScope, $http, $location) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.sortValue = 'name';

        $http({
            method: 'GET',
            url: '//localhost:8001/category'
        })
            .success(function (data) {
                $scope.categories = data;
                $scope.filterItems = {};
                for(var cat in $scope.categories) {
                    $scope.filterItems[$scope.categories[cat]] = true;
                }
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });

        // initial search
        $http({
            method: 'GET',
            url: '//localhost:8001/beer'
        })
            .success(function (data) {
                $scope.beers = data;
                console.log('beers found: ', data);
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });
    }

    init();

    $rootScope.$on('search', function (event, data) {
        "use strict";
        console.log('SEARCHING from beerSearchCtrl: ', event, data);
        $http({
            method: 'GET',
            url: '//localhost:8001/beer/q=' + data
        })
            .success(function (data) {
                $scope.beers = data;
                console.log('beers found: ', data);
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });
    });

    $scope.load = function (beer) {
        console.log('Loading beer: ', beer);
        $location.url('/beers/' + beer.id);
    };

    $scope.catFilter = function(beer) {
        return $scope.filterItems[beer.category];
    };
}]);
