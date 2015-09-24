angular.module('tappr.profile')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$rootScope', '$location', 'userSrc'];


function ProfileCtrl ($scope, $rootScope, $location, userSrc) {

    function init () {
        console.log('INIT');
        var user = $rootScope.user.username;

        //get ratings
        userSrc.getRatings(user).then(getRatingsHandler, errorHandler);

        function getRatingsHandler(results) {
            $scope.user.ratings = results.data;
        }

        //get favorites
        userSrc.getFavorites(user).then(getFavoritesHandler, errorHandler);

        function getFavoritesHandler(results) {
            $scope.user.favorites = results.data;
        }

    }

    init();

    function errorHandler (error) {
        console.log('OOPS!', error);
    }

    $scope.unFavorite = function(beer, index) {
        userSrc.unFavorite(user, beer).then(unFavoriteHandler(results, index), errorHandler);
    };

    function unFavoriteHandler (results, index) {
        $scope.user.favorites.splice(index, 1);
    }

    $scope.goto = function (beer) {
        $location.url('/beers/' + beer.id);
    };

}
