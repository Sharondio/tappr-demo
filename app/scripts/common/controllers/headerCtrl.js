angular.module('tappr.home')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$state', '$cookieStore', 'userSrc'];

function HeaderCtrl ($state, $cookieStore, userSrc) {
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
        return (view === $state.current.url);
    };

    vm.search = function () {
        console.log('SEARCHING');
        $state.go('root.beers.search', {query: vm.query});
    };

    vm.logout = function () {
        console.log('LOGOUT');
        userSrc.logout();
        $state.go('root.home');
        $state.reload();
    };

}