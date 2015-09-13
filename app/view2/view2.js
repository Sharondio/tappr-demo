'use strict';

angular.module('tappr.view2', [])

.controller('View2Ctrl', ['$scope', function($scope) {
    $scope.messages = [];

    function init () {
        console.log("INIT");
        $scope.messages.push('View2Ctrl is initted');
    }

    init();
}]);