angular.module('tappr.home', [])

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('HomeCtrl is initted');
    }
    init();


        $scope.login = function() {
            $http.get('http://localhost:8001/').
                then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }
}]);
