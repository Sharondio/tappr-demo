angular.module('tappr.home')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$location', '$timeout', '$rootScope', '$cookieStore'];

function HeaderCtrl ($scope, $location, $timeout, $rootScope, $cookieStore) {
    console.log('initing HeaderCtrl');

    if ($cookieStore.get('login')) {
        $scope.user = $cookieStore.get('login');
        $rootScope.user = $cookieStore.get('login');
    }

    $scope.isActive = function (view) {
        return (view === $location.path());
    };

    $scope.search = function () {
        console.log('HeaderCtrl: search: ', $scope.query);
        // Getting the search query data to the search controller
        $location.url('/beers');
        $rootScope.query = $scope.query;
        // Have to delay sending the query because the other controller has to be loaded.
        $timeout(function () {
            $rootScope.$broadcast('search', $scope.query);
        }, 50);
    };

    $scope.logout = function () {
        $cookieStore.remove('login');
        $scope.user = {};
        $rootScope.user = {};
        $location.url('/');
    };

}