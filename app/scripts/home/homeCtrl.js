angular.module('tappr.home', [])

.controller('HomeCtrl', ['$scope', function($scope) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('HomeCtrl is initted');
    }

    init();
}]);
