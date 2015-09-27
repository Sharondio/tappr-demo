angular.module('tappr.beersearch', [])

.controller('BeerSearchCtrl', function($scope, $rootScope, $routeParams, $http, $location) {
    $scope.messages = [];

    function init () {
        console.log('INIT', $routeParams);

        var url = '//localhost:8001/';
        var getBeerUrl = url + 'beer';
        var getCategoryUrl = url + 'category';

        $scope.sortValue = 'name';

        $http({
            method: 'GET',
            url: url + 'category'
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
        if ($rootScope.query) {
            getBeerUrl =  url + 'beer?q=' + $rootScope.query;
        } else {
            getBeerUrl = url + 'beer';
        }
        $http({
            method: 'GET',
            url: getBeerUrl
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
            url: '//localhost:8001/beer?q=' + data
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
        $location.url('/beers/detail/' + beer.id);
    };

    $scope.catFilter = function(beer) {
        return $scope.filterItems[beer.category];
    };
});
