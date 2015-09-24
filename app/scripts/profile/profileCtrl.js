angular.module('tappr.profile')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$rootScope', '$location', 'userSrc'];


function ProfileCtrl ($rootScope, $location, userSrc) {

    var vm = this;
    function init () {
        console.log('INIT');
        var user = $rootScope.user.username;

        //get ratings
        userSrc.getRatings(user).then(getRatingsHandler, errorHandler);

        function getRatingsHandler(results) {
            vm.user.ratings = results.data;
        }

        //get favorites
        userSrc.getFavorites(user).then(getFavoritesHandler, errorHandler);

        function getFavoritesHandler(results) {
            vm.user.favorites = results.data;
        }

    }

    init();

    function errorHandler (error) {
        console.log('OOPS!', error);
    }

    vm.unFavorite = function(beer, index) {
        userSrc.unFavorite(user, beer).then(unFavoriteHandler(results, index), errorHandler);
    };

    function unFavoriteHandler (results, index) {
        vm.user.favorites.splice(index, 1);
    }

    vm.goto = function (beer) {
        $location.url('/beers/' + beer.id);
    };

}
