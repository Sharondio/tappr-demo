angular.module('tappr.home')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$cookieStore', '$rootScope', 'userSrc'];

function HomeCtrl ($cookieStore, $rootScope, userSrc) {

    var vm = this;

    function init () {
        console.log('INIT');
        vm.messages = [];
        vm.user = {};
        vm.messages.push('HomeCtrl is initted');

        if ($cookieStore.get('login')) {
            vm.user = $cookieStore.get('login');
            $rootScope.user = $cookieStore.get('login');
            console.log('already logged in!', $cookieStore.get('login'), vm.user);
        }
    }
    init ();

    vm.login = function() {

        userSrc.login(vm.username)
            .then(
            function(result) {
                console.log(result);
                vm.user = result.data;
                $cookieStore.put('login', result.data);
                console.log('homeCtrl: login: ', result.data);
            },
            function(error) {

                if (error.status === 404) {
                    console.log('User not found: creating...');

                    userSrc.create(vm.username)
                        .then(
                        function(result) {
                            console.log('User created!');

                            userSrc.login(vm.username)
                                .then(
                                function(result) {
                                    vm.user = result.data;
                                    $cookieStore.put('login', result.data);

                                    console.log('homeCtrl: login: ', result.data);
                                },
                                function(error) {
                                    console.log('OOPS!', error);
                                }
                            );
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