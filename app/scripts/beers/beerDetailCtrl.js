angular.module('tappr.beerdetail', [])

.controller('BeerDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http',
        function($scope, $rootScope, $routeParams, $location, $http) {
    $scope.messages = [];
    var updateStars;

    function init () {
        console.log('INIT', $routeParams);
        $scope.starsNum = 5;

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

        //TODO Need rating value from profile if it exists
        $scope.ratingValue = 0;

        updateStars = function () {
            $scope.stars = [];
            for (var i = 0; i < $scope.starsNum; i++) {
                $scope.stars.push({
                    filled: i < $scope.ratingValue
                });
            }
        };

        updateStars();
    }

    init();

    $scope.toggle = function(index) {
        console.log('Toggle Rating: ', index);
        if ($scope.readonly == undefined || $scope.readonly === false){
            $scope.ratingValue = index + 1;
            //TODO: Save Rating
        }
    };
    $scope.$watch('ratingValue', function(oldValue, newValue) {
        if (newValue) {
            updateStars();
        }
    });

    $rootScope.$on('search', function (event, data) {
        "use strict";
        console.log('SEARCHING: ', event, data);
    });

}]);
