angular.module('tappr.home', [])

.controller('HomeCtrl', ['$scope', '$http', '$cookieStore', '$rootScope', 'userSrc',
        function($scope, $http, $cookieStore, $rootScope, userSrc) {

        function init () {
            console.log('INIT');
            $scope.messages = [];
            $scope.user = {};
            $scope.messages.push('HomeCtrl is initted');


            if ($cookieStore.get('login')) {
                $scope.user = $cookieStore.get('login');
                $rootScope.user = $cookieStore.get('login');
                console.log('already logged in!', $cookieStore.get('login'), $scope.user);
            }
        }
        init ();

        $scope.login = function() {

            userSrc.login( $scope.username )
                .then(
                    function(result){
                        $scope.user = result.data;
                        $cookieStore.put('login', result.data);
                        console.log('homeCtrl: login: ', result.data );
                    },
                    function(error, code){
                        console.log('OOPS!', code);
                        if (code == '404') {
                            $http({
                                method: 'POST',
                                url: baseUrl,
                                data: {username: $scope.username}
                            })
                                .success(function (data) {
                                    $scope.user = data;
                                    $cookieStore.put('login', data);
                                    console.log('User added: ', data);
                                })
                                .error(function (error, code) {
                                    console.log('OOPS! ', error, code);
                                });
                        }
                    }
                );
        };


}]);
