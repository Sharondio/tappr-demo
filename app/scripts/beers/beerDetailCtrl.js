angular.module('tappr.beers')
    .controller('BeerDetailCtrl', BeerDetailCtrl);

BeerDetailCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'userSrc', 'beerSrc'];

function BeerDetailCtrl ($scope, $rootScope, $routeParams, $location, userSrc, beerSrc) {

    var user = $rootScope.user.username;

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

    function foundBeerHandler (beer) {
        $scope.beer = beer.data[0];
        getRating($scope.beer);
        getFavorite($scope.beer);
    }

    function getRating (beer) {
        return userSrc.getRating(user, beer).then(ratingHandler, errorHandler);
    }

    function ratingHandler (results) {
        $scope.ratingValue = 0;
        if (results) {
            $scope.ratingValue = results.rating;
        }
    }

    function getFavorite (beer) {
        return userSrc.getFavorite(user, beer).then(getFavoriteHandler, errorHandler);
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
            userSrc.addRating(user, $scope.beer, $scope.ratingValue).then(addRatingHandler, errorHandler);
        }
    }

    function addRatingHandler () {
        // do nothing
    }

    $scope.favorite = function () {
        userSrc.addFavorite(user, $scope.beer).then(addFavoriteHandler, errorHandler);
    };

    function addFavoriteHandler () {
        $scope.isFavorite = true;
    }

    $scope.unFavorite = function () {
        UserSrc.unFavorite(user, $scope.beer).then(unFavoriteHandler, errorHandler);
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

}
