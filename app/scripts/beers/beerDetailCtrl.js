angular.module('tappr.beers')
    .controller('BeerDetailCtrl', BeerDetailCtrl);

BeerDetailCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'userSrc', 'beerSrc'];


function BeerDetailCtrl ($rootScope, $routeParams, $location, userSrc, beerSrc) {

    var vm = this;
    var user = $rootScope.user.username;

    function init () {
        console.log('INIT', $routeParams);
        vm.starsNum = 5;

        if ($routeParams.id) {
            beerSrc.findOne($routeParams.id).then(foundBeerHandler(beer), errorHandler(err));

            function foundBeerHandler (beer) {
                vm.beer = beer;
                getRating(beer);
                getFavorite(beer);
            }

            function getRating (beer) {
                return beerSrc.getRating(user, beer).then(ratingHandler(beer), errorHandler(err));
            }

            function ratingHandler (results) {
                vm.ratingValue = 0;
                if (results) {
                    vm.ratingValue = results.rating;
                }
            }

            function getFavorite (beer) {
                return beerSrc.getFavorite(user, beer).then(getFavoriteHandler(results),errorHandler(err));
            }

            function getFavoriteHandler (results) {
                vm.isFavorite = results;
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
        vm.stars = [];
        for (var i = 0; i < vm.starsNum; i++) {
            vm.stars.push({
                filled: i < vm.ratingValue
            });
        }
        if (!init) {
            userSrc.addRating(user, vm.beer, vm.ratingValue).then(addRatingHandler, errorHandler);
        }
    }

    function addRatingHandler () {
        // do nothing
    }

    vm.favorite = function () {
        userSrc.addFavorite(user, beer).then(addFavoriteHandler(), errorHandler(error));
    };

    function addFavoriteHandler () {
        vm.isFavorite = true;
    }

    vm.unFavorite = function () {
        UserSrc.unFavorite(user, beer).then(unFavoriteHandler(), errorHandler(error));
    };

    function unFavoriteHandler () {
        vm.isFavorite = false;
    }
            
    vm.toggle = function(index) {
        console.log('Toggle Rating: ', index);
        if (vm.readonly == undefined || vm.readonly === false){
            vm.ratingValue = index + 1;
            //TODO: Save Rating
        }
    };

    vm.goBack = function () {
        console.log('go back')
        $location.url('/beers');
    }

    vm.$watch('ratingValue', function(newValue) {
        if (newValue) {
            updateStars();
        }
    });
}
