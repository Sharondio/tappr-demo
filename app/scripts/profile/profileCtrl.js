angular.module('tappr.profile', [])

.controller('ProfileCtrl', ['$scope', '$rootScope', '$http', '$location', 'userSrc',
        function($scope, $rootScope, $http, $location, userSrc) {

            var user = $rootScope.user.username;

            function init () {
                console.log('INIT');

                //get ratings
                userSrc.getRatings(user).then(getRatingsHandler, errorHandler);

                //get favorites
                userSrc.getFavorites(user).then(getFavoritesHandler, errorHandler);
            }

            init();

            function getRatingsHandler(results) {
                $scope.user.ratings = results.data;
            }

            function getFavoritesHandler(results) {
                $scope.user.favorites = results.data;
            }

            function errorHandler (error) {
                console.log('OOPS!', error);
            }

            $scope.unFavorite = function(beer, index) {
                userSrc.unFavorite(user, beer).then(unFavoriteHandler(index), errorHandler);
            };

            function unFavoriteHandler (index) {
                $scope.user.favorites.splice(index, 1);
            }

            $scope.unRate = function(beer, index) {
                userSrc.unRate(user, beer).then(unRateHandler(index), errorHandler);
            };

            function unRateHandler (index) {
                $scope.user.ratings.splice(index, 1);
            }

            $scope.goto = function (beer) {
                $location.url('/beers/' + beer.id);
            };

        }]);
