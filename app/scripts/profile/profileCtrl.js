angular.module('tappr.profile')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$location', 'userSrc'];


function ProfileCtrl ($location, userSrc) {

    var vm = this;

    function init () {
        console.log('INIT');
        vm.user = userSrc.user;
    }

    init();

    function errorHandler (error) {
        console.log('OOPS!', error);
    }

    vm.unFavorite = function(beer, index) {
        userSrc.unFavorite(beer).then(unFavoriteHandler(index), errorHandler);
    };

    function unFavoriteHandler (results, index) {
        vm.user.favorites.splice(index, 1);
    }

    vm.unRate = function (beer, index) {
        userSrc.unRate(beer).then(unRateHandler(index), errorHandler);
    }

    function unRateHandler(results, index) {
        vm.user.ratings.splice(index, 1);
    }

    vm.goto = function (beer) {
        $location.url('/beers/' + beer.id);
    };

}
