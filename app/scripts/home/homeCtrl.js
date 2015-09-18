angular.module('tappr.home', [])

.controller('HomeCtrl', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {

    var baseUrl = '//localhost:8001/user/',
        queryUrl;

    function init () {
        console.log('INIT');
        $scope.messages = [];
        $scope.user = {};
        $scope.messages.push('HomeCtrl is initted');


        if ($cookieStore.get('login')) {
            $scope.user = $cookieStore.get('login');
            console.log('already logged in!', $cookieStore.get('login'), $scope.user);
        }
    }
    init();

    $scope.login = function() {
        queryUrl = baseUrl + $scope.username;
        $http({
            method: 'GET',
            url: queryUrl
        })
            .success(function (data) {
                $scope.user = data;
                $cookieStore.put('login', data);
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
                            $cookieStore.put('login', data);
                            console.log('User added: ', data);
                        })
                        .error(function (error, code) {
                            console.log('OOPS! ', error, code);
                        });
                }
            });
    };
}]);
