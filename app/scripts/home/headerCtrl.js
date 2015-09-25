angular.module('tappr.home')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$location', '$timeout', '$rootScope', '$cookieStore', '$route'];

function HeaderCtrl ($scope, $location, $timeout, $rootScope, $cookieStore, $route) {
    console.log('initing HeaderCtrl');

    if ($cookieStore.get('login')) {
        $scope.user = $cookieStore.get('login');
        $rootScope.user = $cookieStore.get('login');
    }

    $scope.isActive = function (view) {
        return (view === $location.path());
    };

    $scope.search = function () {
        console.log('SEARCHING');
        $location.url('/beers/' + $scope.query);
        // Have to delay sending the query because the other controller has to be loaded.
        $timeout(function () {
            $rootScope.emit('search', {query: $scope.query});
        }, 50);
    };

    $scope.logout = function () {
        console.log('LOGGING OUT');
        $cookieStore.remove('login');
        $scope.user = {};
        $rootScope.user = {};
        $location.url('/');
        $route.reload();
    };

}
