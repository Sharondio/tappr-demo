angular.module('tappr.beerdetail', [])

.controller('BeerDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'userSrc', 'beerSrc',
        function($scope, $rootScope, $routeParams, $location, $http, userSrc, beerSrc) {

            var user = $rootScope.user.username;

    function init () {
        console.log('INIT', $routeParams);
        $scope.starsNum = 5;

        if ($routeParams.id) {
            beerSrc.findOne($routeParams.id).then(foundBeerHandler(beer), errorHandler(err));

            function foundBeerHandler (beer) {
                $scope.beer = beer;
                getRating(beer);
                getFavorite(beer);
            }

            function getRating (beer) {
                return beerSrc.getRating(user, beer).then(ratingHandler(beer), errorHandler(err));
            }

            function ratingHandler (results) {
                $scope.ratingValue = 0;
                if (results) {
                    $scope.ratingValue = results.rating;
                }
            }

            function getFavorite (beer) {
                return beerSrc.getFavorite(user, beer).then(getFavoriteHandler(results),errorHandler(err));
            }

            function getFavoriteHandler (results) {
                $scope.isFavorite = results;
            }

            function errorHandler (error) {
                console.log('OOPS!', error);
            }

        } else {
            $location.url('/');
        }
    };

    init();

    function updateStars (init) {
        $scope.stars = [];
        for (var i = 0; i < $scope.starsNum; i++) {
            $scope.stars.push({
                filled: i < $scope.ratingValue
            });
        }
        if (!init) {
            userSrc.addRating(user, $scope.beer, $scope.ratingValue).then(addRatingHandler, errorHandler);
        }
    }

    function addRatingHandler () {
        // do nothing
    }

    $scope.favorite = function () {
        userSrc.addFavorite(user, beer).then(addFavoriteHandler(), errorHandler(error));
    };

    function addFavoriteHandler () {
        $scope.isFavorite = true;
    }

    $scope.unFavorite = function () {
        UserSrc.unFavorite(user, beer).then(unFavoriteHandler(), errorHandler(error));
    };

    function unFavoriteHandler () {
        $scope.isFavorite = false;
    }
            
    $scope.toggle = function(index) {
        console.log('Toggle Rating: ', index);
        if ($scope.readonly == undefined || $scope.readonly === false){
            $scope.ratingValue = index + 1;
            //TODO: Save Rating
        }
    };

    $scope.goBack = function () {
        console.log('go back')
        $location.url('/beers');
    }

    $scope.$watch('ratingValue', function(newValue) {
        if (newValue) {
            updateStars();
        }
    });

}]);
