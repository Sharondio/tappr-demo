angular.module('tappr.profile')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$rootScope', '$location', 'userSrc'];


function ProfileCtrl ($rootScope, $location, userSrc) {

    var vm = this;

    function init () {
        console.log('INIT');
        vm.user = $rootScope.user;

        //get ratings
        userSrc.getRatings(vm.user.username).then(getRatingsHandler, errorHandler);

        //get favorites
        userSrc.getFavorites(vm.user.username).then(getFavoritesHandler, errorHandler);
    }

    init();

    function getRatingsHandler(results) {
        vm.user.ratings = results.data;
    }

    function getFavoritesHandler(results) {
        vm.user.favorites = results.data;
    }

    function errorHandler (error) {
        console.log('OOPS!', error);
    }

    vm.unFavorite = function(beer, index) {
        userSrc.unFavorite(vm.user.username, beer).then(unFavoriteHandler(index), errorHandler);
    };

    function unFavoriteHandler (results, index) {
        vm.user.favorites.splice(index, 1);
    }

    vm.unRate = function (beer, index) {
        userSrc.unRate(vm.user.username, beer).then(unRateHandler(index), errorHandler);
    }

    function unRateHandler(results, index) {
        vm.user.ratings.splice(index, 1);
    }

    vm.goto = function (beer) {
        $location.url('/beers/' + beer.id);
    };

}
