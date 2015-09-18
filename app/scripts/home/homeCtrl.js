angular.module('tappr.home', [])

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

        function init () {
            console.log('INIT');
            $scope.messages = [];
            $scope.user = {};
            $scope.messages.push('HomeCtrl is initted');
        }
        init();

        $scope.login = function() {
            var baseUrl = '//localhost:8001/user/' ;
            var queryUrl = baseUrl + $scope.username;
            $http({
                method: 'GET',
                url: queryUrl
            })
                .success(function (data) {
                    $scope.user = data;
                    console.log( 'homeCtrl: login: ', data );
                })
                .error(function (error, code) {
                    console.log('OOPS!', code);
                    if (code == '404') {
                        var newUser = {
                            username: $scope.username,
                            favorites: [],
                            ratings: []
                        };
                        $http({
                            method: 'POST',
                            url: baseUrl,
                            data: newUser
                        })
                            .success(function (data) {
                                $scope.user = data;
                                console.log('User added: ', data);
                            })
                            .error(function (error, code) {
                                console.log('OOPS! ', error, code);
                            });
                    }
                });
        };
}]);
