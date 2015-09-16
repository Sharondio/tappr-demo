angular.module('tappr.profile', [])

.controller('ProfileCtrl', ['$scope', function($scope) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('ProfileCtrl is initted');
    }

    init();
}]);
