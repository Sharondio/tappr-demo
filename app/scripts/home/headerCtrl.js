angular.module('tappr.home')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$location', '$timeout', '$rootScope', '$cookieStore', 'messageSrc'];

function HeaderCtrl ($location, $timeout, $rootScope, $cookieStore, messageSrc) {
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
        // Have to delay sending the query because the other controller has to be loaded.
        $timeout(function () {
            messageSrc.broadcast(vm.query);
        }, 50);
    };

    vm.logout = function () {
        $cookieStore.remove('login');
        vm.user = {};
        $rootScope.user = {};
        $location.url('/');
    };

}
