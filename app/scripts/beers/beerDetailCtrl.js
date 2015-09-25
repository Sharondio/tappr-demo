angular.module('tappr.beerdetail', [])
    .controller('BeerDetailCtrl', ['$scope', '$routeParams', '$location', '$http', 'userSrc', 'beerSrc',
    function($scope, $routeParams, $location, $http, userSrc, beerSrc) {

        $scope.user = userSrc.user;

        function init () {
            console.log('INIT', $routeParams);
            $scope.starsNum = 5;

            if ($routeParams.id) {
                beerSrc.findOne($routeParams.id).then(foundBeerHandler, errorHandler);
            } else {
                $location.url('/');
            }
        };

        init();

        function foundBeerHandler (results) {
            $scope.beer = results.data[0];
            getRating($scope.beer);
            getFavorite($scope.beer);
        }

        function getRating (beer) {
            console.log('getRating: ', beer);
            userSrc.getRating(beer).then(ratingHandler, ratingErrorHandler);
        }

        function ratingHandler (results) {
            console.log('ratingHandler: ', results);
            $scope.ratingValue = 0;
            if (results) {
                $scope.ratingValue = results.data.rating;
                updateStars(true);
            }
        }

        function ratingErrorHandler (error) {
            if (error.status === 404) {
                $scope.ratingValue = 0;
                updateStars(true);
            } else {
                errorHandler(error);
            }
        }

        function getFavorite (beer) {
            return userSrc.getFavorite(beer).then(getFavoriteHandler, errorHandler);
        }

        function getFavoriteHandler (results) {
            $scope.isFavorite = results;
        }

        function errorHandler (error) {
            console.log('OOPS!', error);
        }

        function updateStars (init) {
            $scope.stars = [];
            for (var i = 0; i < $scope.starsNum; i++) {
                $scope.stars.push({
                    filled: i < $scope.ratingValue
                });
            }
            if (!init) {
                userSrc.addRating($scope.beer, $scope.ratingValue).then(addRatingHandler, errorHandler);
            }
        }

        function addRatingHandler () {
            // do nothing
        }

        $scope.favorite = function () {
            userSrc.addFavorite($scope.beer).then(addFavoriteHandler, errorHandler);
        };

        function addFavoriteHandler () {
            $scope.isFavorite = true;
        }

        $scope.unFavorite = function () {
            userSrc.unFavorite($scope.beer).then(unFavoriteHandler, errorHandler);
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
