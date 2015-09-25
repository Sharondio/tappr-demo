angular.module('tappr.home', [])
    .controller('HeaderCtrl', function ($scope, $location, $rootScope, $cookieStore, $route) {
        console.log('initing HeaderCtrl');

        if ($cookieStore.get('login')) {
            $scope.user = $cookieStore.get('login');
            $rootScope.user = $cookieStore.get('login');
        }

        $scope.isActive = function (view) {
            return (view === $location.path());
        };

        $scope.search = function () {
            $rootScope.query = $scope.query;
            $location.url('/beers/' + $scope.query);
            $route.reload();
        };

        $scope.logout = function () {
            $cookieStore.remove('login');
            $scope.user = {};
            $rootScope.user = {};
            $route.reload();
        };

    });
