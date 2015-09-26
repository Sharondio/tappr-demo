angular.module('tappr.beers')
    .controller('BeerDetailCtrl', BeerDetailCtrl);

BeerDetailCtrl.$inject = ['$stateParams','userSrc', 'beerSrc'];

function BeerDetailCtrl ($stateParams, userSrc, beerSrc) {

    var vm = this;

    vm.user = userSrc.user.username;
    console.log('USER: ', vm.user);
    vm.ratingValue = undefined;

    function init () {
        vm.starsNum = 5;

        if ($stateParams.id) {
            beerSrc.findOne($stateParams.id).then(foundBeerHandler, errorHandler);
        } else {
            $state.go('root.beers.search');
        }
    };

    init();

    function foundBeerHandler (beer) {
        vm.beer = beer.data[0];
        getRating(vm.beer);
        getFavorite(vm.beer);
    }

    function getRating (beer) {
        console.log('beer: ', beer);
        return userSrc.getRating(beer).then(ratingHandler, ratingErrorHandler);
    }

    function ratingHandler (results) {
        if (results) {
            vm.ratingValue = results.data.rating;
            updateStars()
        }
    }

    function ratingErrorHandler (error) {
        if(error.status === 404) {
            vm.ratingValue = 0;
            updateStars(true);
        } else {
            console.log('OOPS! Real error here. ', error);
        }
    }

    function getFavorite (beer) {
        return userSrc.getFavorite(beer).then(getFavoriteHandler, getFavoriteErrorHandler);
    }

    function getFavoriteHandler (results) {
        vm.isFavorite = results;
    }

    function getFavoriteErrorHandler (error) {
        if (error.status === 404) {
            vm.isFavorite = false;
        } else {
            console.log('OOPS! Real error here.');
        }
    }

    function errorHandler (error) {
        console.log('Controller OOPS!', error);
    }

    function updateStars (init) {
        console.log('updating stars');
        vm.stars = [];
        for (var i = 0; i < vm.starsNum; i++) {
            vm.stars.push({
                filled: i < vm.ratingValue
            });
        }
        if (!init) {
            userSrc.addRating(vm.beer, vm.ratingValue).then(addRatingHandler, errorHandler);
        }
    }

    function addRatingHandler () {
        // do nothing
    }

    vm.favorite = function () {
        userSrc.addFavorite(vm.beer).then(addFavoriteHandler, errorHandler);
    };

    function addFavoriteHandler () {
        vm.isFavorite = true;
    }

    vm.unFavorite = function () {
        userSrc.unFavorite(vm.beer).then(unFavoriteHandler, errorHandler);
    };

    function unFavoriteHandler () {
        vm.isFavorite = false;
    }

    vm.toggle = function(index) {
        console.log('Toggle Rating: ', index);
        if (vm.readonly == undefined || vm.readonly === false){
            vm.ratingValue = index + 1;
        }
        updateStars();
    };

    vm.goBack = function () {
        console.log('go back')
        $state.go('root.beers.search');
    };
}