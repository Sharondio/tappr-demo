angular.module('tappr.beerdetail', [])

.controller('BeerDetailCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.messages = [];

    function init () {
        console.log('INIT');
        $scope.messages.push('BeerDetailCtrl is initted');
    }

    init();

    $rootScope.$on('search', function (event, data) {
        "use strict";
        console.log('SEARCHING: ', event, data);
    });

}]);
