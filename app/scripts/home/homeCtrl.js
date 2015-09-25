angular.module('tappr.home')
    .controller('HomeCtrl', ['$scope', '$cookieStore', '$rootScope', 'userSrc',
        function($scope, $cookieStore, $rootScope, userSrc) {

            $scope.user = {};

            $scope.login = function() {
                userSrc.login($scope.username).then(successLoginHandler, errorLoginHandler);
            };

            function successLoginHandler () {
                console.log('SUCCESS LOGIN: ', $scope.user);
                //$scope.user = userSrc.user;
            }

            function errorLoginHandler (error) {
                console.log('errorloginhandler')
                createLogin($scope.username);
            }

            function errorHandler (error) {
                console.log('I tried my best, just can\'t get this person logged in.', error);
            }

            function createLogin() {
                console.log('creating login');
                userSrc.create($scope.username).then(successCreateHandler, errorHandler);
            }

            function successCreateHandler () {
                console.log('SUCCESS CREATE: ', $scope.user);
                //$scope.user = userSrc.user;
            }

        }]);
