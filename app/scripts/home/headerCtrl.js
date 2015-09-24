angular.module('tappr.home')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$location', '$rootScope', '$cookieStore', '$route'];

function HeaderCtrl ($location, $rootScope, $cookieStore, $route) {
    var vm = this;

    if ($cookieStore.get('login')) {
        vm.user = $cookieStore.get('login');
        $rootScope.user = $cookieStore.get('login');
    }

    vm.isActive = function (view) {
        return (view === $location.path());
    };

    vm.search = function () {
        console.log('SEARCHING');
        $location.url('/beers/' + vm.query);
        $route.reload();
    };

    vm.logout = function () {
        console.log('LOGOUT');
        $cookieStore.remove('login');
        vm.user = {};
        $rootScope.user = {};
        $route.reload();
    };

}
