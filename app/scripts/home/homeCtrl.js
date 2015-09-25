angular.module('tappr.home')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', '$cookieStore', '$rootScope', 'userSrc'];

function HomeCtrl ($scope, $cookieStore, $rootScope, userSrc) {

    function init () {
        console.log('INIT');
        $scope.user = {};

        if ($cookieStore.get('login')) {
            $scope.user = $cookieStore.get('login');
            $rootScope.user = $cookieStore.get('login');
            console.log('already logged in!', $cookieStore.get('login'), $scope.user);
        }
    }
    init ();

    $scope.login = function() {

        userSrc.login($scope.username)
            .then(
            function(result) {
                console.log(result);
                $scope.user = result.data;
                $cookieStore.put('login', result.data);
                $rootScope.user = $scope.user;
                console.log('homeCtrl: login: ', result.data);
            },
            function(error) {

                if (error.status === 404) {
                    console.log('User not found: creating...');

                    userSrc.create($scope.username)
                        .then(
                        function(result) {
                            console.log('User created!');

                            userSrc.login($scope.username)
                                .then(
                                function(result) {
                                    $scope.user = result.data;
                                    $cookieStore.put('login', result.data);
                                    $rootScope.user = $scope.user;
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