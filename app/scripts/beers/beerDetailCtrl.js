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
                    updateStars(true);
                    //$http({
                    //    method: 'GET',
                    //    url: '//localhost:8001/user/' + $rootScope.user.username + '/favorite/' + $scope.beer.name
                    //})
                    //    .success(function (data) {
                    //        console.log('checking favorite stataus: ', data);
                    //    })
                    //    .error( function (error, data) {
                    //        console.log('OOPS!', error);
                    //    });
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

        updateStars = function (init) {
            $scope.stars = [];
            for (var i = 0; i < $scope.starsNum; i++) {
                $scope.stars.push({
                    filled: i < $scope.ratingValue
                });
            }
            if (!init) {
                $http({
                    method: 'POST',
                    url: '//localhost:8001/user/' + $scope.user.username + "/rating",
                    data: {
                        beer: {
                            name: $scope.beer.name,
                            rating: $scope.ratingValue
                        }
                    }
                })
                .success(function (data) {

                })
                .error(function (error) {
                    console.log('OOPS!', error);
                });
            }
        };
    }

    init();

            $scope.favorite = function () {

            }

    $scope.toggle = function(index) {
        console.log('Toggle Rating: ', index);
        if ($scope.readonly == undefined || $scope.readonly === false){
            $scope.ratingValue = index + 1;
            //TODO: Save Rating
        }
    };
    $scope.$watch('ratingValue', function(newValue) {
        if (newValue) {
            updateStars();
        }
    });

}]);
