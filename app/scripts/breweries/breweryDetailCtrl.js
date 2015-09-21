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

                    console.log('beer found: ', data[0]);
                    $scope.beer = data[0];

                    // check rating
                    $http({
                        method: 'GET',
                        url: '//localhost:8001/user/' + $scope.user.username + '/rating/beer/' + $scope.beer.id
                    }).success(function (data) {
                        console.log('GET RATING: ', data);
                        $scope.ratingValue = data.rating;
                        updateStars(true);
                    }).error(function (error, data) {
                        if (data === 404) {
                            $scope.ratingValue = 0;
                            updateStars(true);
                        } else {
                            console.log('OOPS!', error, data);
                        }
                    });

                    // check favorites status
                    $http({
                        method: 'GET',
                        url: '//localhost:8001/user/' + $scope.user.username + '/favorite/beer/' + $scope.beer.id
                    }).success(function (data) {
                        console.log('IS FAVORITE: ', data);
                        $scope.isFavorite = true;
                    }).error (function (error, data) {
                        $scope.isFavorite = false;
                        console.log('OOPS!', error, data);
                    });

                })
                .error(function (error) {
                    console.log('OOPS!', error);
                });

        } else {
            $location.url('/');
        }

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
                    url: '//localhost:8001/user/' + $scope.user.username + "/rating/beer",
                    data: {
                        id: $scope.beer.id,
                        name: $scope.beer.name,
                        rating: $scope.ratingValue
                    }
                }).success(function (data) {

                }).error(function (error) {
                    console.log('OOPS!', error);
                });
            }
        };
    }

    init();

    $scope.favorite = function () {
        $http({
            method: 'POST',
            url: '//localhost:8001/user/' + $scope.user.username + '/favorite/beer',
            data: {
                'name': $scope.beer.name,
                'id': $scope.beer.id
            }
        }).success(function (data) {
            $scope.isFavorite = true;
        }).error(function (error) {
            console.log('OOPS!', error);
        });
    };

    $scope.unFavorite = function () {
        $http({
            method: 'DELETE',
            url: '//localhost:8001/user/' + $scope.user.username + '/favorite/beer/' + $scope.beer.id
        }).success(function (data) {
            $scope.isFavorite = false;
        }).error(function (error) {
            console.log('OOPS!', error);
        });
    };

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
