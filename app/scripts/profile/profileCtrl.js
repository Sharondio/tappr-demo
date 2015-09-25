angular.module('tappr.profile')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$rootScope', '$location', 'userSrc'];


function ProfileCtrl ($scope, $rootScope, $location, userSrc) {

    function init () {
        console.log('INIT');
        $scope.user = $rootScope.user;
    }

    init();
    
    function errorHandler (error) {
        console.log('OOPS!', error);
    }

    $scope.unFavorite = function(beer, index) {
        userSrc.unFavorite($scope.user.username, beer).then(unFavoriteHandler(index), errorHandler);
    };

    function unFavoriteHandler (results, index) {
        $scope.user.favorites.splice(index, 1);
    }

    $scope.unRate = function (beer, index) {
        userSrc.unRate($scope.user.username, beer).then(unRateHandler(index), errorHandler);
    }

    function unRateHandler(results, index) {
        $scope.user.ratings.splice(index, 1);
    }

    $scope.goto = function (beer) {
        $location.url('/beers/' + beer.id);
    };

}
