angular.module('tappr.profile', [])
    .controller('ProfileCtrl', ['$scope', '$http', '$location', 'userSrc',
    function($scope, $http, $location, userSrc) {

        $scope.user = userSrc.user;
        console.log('profileCtrl: $scope.user: ', $scope.user);

        function errorHandler (error) {
            console.log('OOPS!', error);
        }

        $scope.unFavorite = function(beer, index) {
            userSrc.unFavorite(beer).then(unFavoriteHandler(index), errorHandler);
        };

        function unFavoriteHandler (index) {
            $scope.user.favorites.splice(index, 1);
        }

        $scope.unRate = function(beer, index) {
            userSrc.unRate(beer).then(unRateHandler(index), errorHandler);
        };

        function unRateHandler (index) {
            $scope.user.ratings.splice(index, 1);
        }

        $scope.goto = function (beer) {
            $location.url('/beers/' + beer.id);
        };

    }]);
