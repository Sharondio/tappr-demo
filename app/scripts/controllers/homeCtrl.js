angular.module('tappr.home', [])

.controller('HomeCtrl', ['$scope', '$http', '$cookieStore', '$rootScope',
        function($scope, $http, $cookieStore, $rootScope) {

        var baseUrl = '//localhost:8001/user/',
            queryUrl;

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
            queryUrl = baseUrl + $scope.username;
            $http({
                method: 'GET',
                url: queryUrl
            })
                .success(function (data) {
                    $scope.user = data;
                    $rootScope.user = $scope.user;
                    $cookieStore.put('login', data);
                    console.log('homeCtrl: login: ', data );
                })
                .error(function (error, code) {
                    console.log('OOPS!', code);
                    if (code == '404') {
                        $http({
                            method: 'POST',
                            url: baseUrl,
                            data: {username: $scope.user.username}
                        }).success(function (results) {
                            $scope.user = results.data;
                            $cookieStore.put('login', results.data);
                            console.log('User added: ', results.data);
                        }).error(function (error) {
                            console.log('OOPS! ', error);
                        });
                    }
                });
        };

        $rootScope.$on('search', function (event, data) {
            "use strict";
            console.log('SEARCHING: ', event, data);
            $http({
                method: 'GET',
                url: '//localhost:8001/beer',
                data: {query: data}
            })
                .success(function (data) {
                    $scope.beers = data;
                    console.log('beers found: ', data);
                })
                .error(function (error) {
                    console.log('OOPS!', error);
                });
        });

}]);
