angular.module('tappr.view1', [])

.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('View1Ctrl is initted');
    }

    init();
}]);
