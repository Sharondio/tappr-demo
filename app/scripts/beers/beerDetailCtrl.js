angular.module('tappr.beers')
    .controller('BeerDetailCtrl', BeerDetailCtrl);

BeerDetailCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'userSrc', 'beerSrc'];

function BeerDetailCtrl ($scope, $rootScope, $routeParams, $location, userSrc, beerSrc) {

    var user = $rootScope.user.username;
    $scope.ratingValue = undefined;

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
        return userSrc.getRating(user, beer).then(ratingHandler, ratingErrorHandler);
    }

    function ratingHandler (results) {
        if (results) {
            $scope.ratingValue = results.rating;
        }
    }

    function ratingErrorHandler (error) {
        console.log('ratingErrorHanlder: ', error);
        if(error.status === 404) {
            $scope.ratingValue = 0;
            updateStars(true);
        } else {
            console.log('OOPS! Real error here. ', error);
        }
    }

    function getFavorite (beer) {
        return userSrc.getFavorite(user, beer).then(getFavoriteHandler, getFavoriteErrorHandler);
    }

    function getFavoriteHandler (results) {
        $scope.isFavorite = results;
    }

    function getFavoriteErrorHandler (error) {
        if (error.status === 404) {
            $scope.isFavorite = false;
        } else {
            console.log('OOPS! Real error here.');
        }
    }

    function errorHandler (error) {
        console.log('Controller OOPS!', error);
    }

    function updateStars (init) {
        console.log('updating stars');
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
