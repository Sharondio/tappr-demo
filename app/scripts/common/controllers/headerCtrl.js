angular.module('tappr.common')
    .controller('HeaderCtrl', ['$scope', '$state', '$timeout', '$rootScope', '$cookieStore', 'messageSrc',

        function ($scope, $state, $timeout, $rootScope, $cookieStore, messageSrc) {
            console.log('initing HeaderCtrl');

            if ($cookieStore.get('login')) {
                $scope.user = $cookieStore.get('login');
                $rootScope.user = $cookieStore.get('login');
            }

            $scope.isActive = function (view) {
                return (view === $state.current.url);
            };

            $scope.search = function () {
                console.log('SEARCHING');
                $location.url('/beers/' + $scope.query);
                // Have to delay sending the query because the other controller has to be loaded.
                $timeout(function () {
                    messageSrc.broadcast($scope.query);
                }, 50);
            };

            $scope.logout = function () {
                $cookieStore.remove('login');
                $scope.user = {};
                $rootScope.user = {};
                $state.go('root.home');
            };

        }
    ]);
