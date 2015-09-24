angular.module('tappr.home')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$location', '$timeout', '$rootScope', '$cookieStore', 'messageSrc'];

function HeaderCtrl ($scope, $location, $timeout, $rootScope, $cookieStore, messageSrc) {
    console.log('initing HeaderCtrl');

    if ($cookieStore.get('login')) {
        $scope.user = $cookieStore.get('login');
        $rootScope.user = $cookieStore.get('login');
    }

    $scope.isActive = function (view) {
        return (view === $location.path());
    };

    $scope.search = function () {
        $location.url('/beers');
        // Have to delay sending the query because the other controller has to be loaded.
        $timeout(function () {
            messageSrc.broadcast($scope.query);
        }, 50);
    };

    $scope.logout = function () {
        $cookieStore.remove('login');
        $scope.user = {};
        $rootScope.user = {};
        $location.url('/');
    };

}
