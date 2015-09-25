angular.module('tappr.home')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$location', '$cookieStore', '$route', 'userSrc'];

function HeaderCtrl ($location, $cookieStore, $route, userSrc) {
    var vm = this;

    console.log('Cookie: ', $cookieStore.get('login'), userSrc);

    if ($cookieStore.get('login')) {
        console.log('Have a cookie...loggging in!');
        userSrc.login($cookieStore.get('login'))
            .then(
            function () {
                vm.user = userSrc.user;
                console.log('Logged in!');
            },
            function (error) {
                console.log('login error: ', error);
            }
        );
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
        userSrc.logout();
        $route.reload();
    };

}
