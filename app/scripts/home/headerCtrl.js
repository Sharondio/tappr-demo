angular.module('tappr.home', [])

    .controller('HeaderCtrl', ['$scope', '$location', '$rootScope', '$cookieStore', '$route', 'userSrc',
        function($scope, $location, $rootScope, $cookieStore, $route, userSrc) {
            console.log('initing HeaderCtrl');

            if ($cookieStore.get('login')) {
                console.log('there is a cookie', $cookieStore.get('login'));
                var user = $cookieStore.get('login');
                userSrc.refreshUser(user.username)
                    .then(function () {
                        $scope.user = userSrc.user;
                    });
                $scope.user = userSrc.user;
            }

            $scope.isActive = function (view) {
                return (view === $location.path());
            };

            $scope.search = function () {
                $rootScope.query = $scope.query;
                $location.url('/beers/' + $scope.query);
                $route.reload();
            };

            $scope.logout = function () {
                userSrc.logout();
                $route.reload();
            };

        }]);