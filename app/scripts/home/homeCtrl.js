angular.module('tappr.home')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$cookieStore', 'userSrc'];

function HomeCtrl ($cookieStore, userSrc) {

    var vm = this;
    vm.user = userSrc.user;

    vm.login = function() {
        userSrc.login(vm.username)
            .then(
            function(result) {
                vm.user = userSrc.user;
                console.log('homeCtrl: login: ', result, $cookieStore.get('login'));
            },
            function(error) {
                if (error.status === 404) {
                    console.log('User not found: creating...');
                    userSrc.create(vm.username)
                        .then(
                            function(result) {
                                vm.user = userSrc.user;
                                console.log('User created!', userSrc.user, vm.user);
                            },
                            function(error) {
                                console.log('I tried my best, just can\'t get this person logged in.', error);
                            }
                    );
                }
            }
        );
    };
}