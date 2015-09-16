angular.module('tappr.beerdetail', [])

.controller('BeerDetailCtrl', ['$scope', function($scope) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('BeerDetailCtrl is initted');
    }

    init();
}]);
