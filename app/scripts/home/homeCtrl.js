angular.module('tappr.home')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', '$cookieStore', 'userSrc'];

function HomeCtrl ($scope, $cookieStore, userSrc) {

    var vm = this;
    vm.user = userSrc.user;

    // // $watch is a little tricky in controllerAs land.
    // $scope.$watch(angular.bind(this, function () {
    //     return this.username; // `this` IS the `this` above!!
    // }), function (newVal, oldVal) {
    //     // now we will pickup changes to newVal and oldVal
    //     console.log('username changed!', newVal, oldVal);
    // });

    // John Papa says this should work. But it doesn't.
    // $scope.$watch('vm.user.username', function(current, original) {
    //     console.log('vm.user was %s', original);
    //     console.log('vm.user is now %s', current);
    // });

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