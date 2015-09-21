angular.module('tappr.profile', [])

.controller('ProfileCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    function init () {
        console.log('INIT');
        //get ratings
        $http({
            method: 'GET',
            url: '//localhost:8001/user/SharonDio/rating'
        })
            .success(function (data) {
                $scope.user.ratings = data;
                console.log( data );
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });
        //get favorites
        $http({
            method: 'GET',
            url: '//localhost:8001/user/SharonDio/favorite'
        })
            .success(function (data) {
                $scope.user.favorites = data;
                console.log( data );
            })
            .error(function (error) {
                console.log('OOPS!', error);
            });
    }

    init();

    $scope.unFavorite = function(beer, index) {
        console.log('UnFavorite beer: ', beer, index);
        $http({
            method: 'DELETE',
            url: '//localhost:8001/user/' + $scope.user.username + '/favorite/' + beer
        }).success(function () {
            $scope.user.favorites.splice(index, 1);
        }).error(function (error) {
            console.log('OOPS!', error);
        });
    };

    $scope.unRate = function(beer, index) {
        console.log('UnRate beer: ', beer);
        $http({
            method: 'DELETE',
            url: '//localhost:8001/user/' + $scope.user.username + '/rating/' + beer.beername
        }).success(function () {
            $scope.user.ratings.splice(index, 1);
        }).error(function (error) {
            console.log('OOPS!', error);
        });
    };
}]);
