angular.module('tappr.beersearch', [])

.controller('BeerSearchCtrl', ['$scope', function($scope) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('BeerSearchCtrl is initted');
    }

    init();
}]);
