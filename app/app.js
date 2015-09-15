'use strict';

var app = angular.module('tappr', [
    'ngRoute',
    'tappr.view1',
    'tappr.view2'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/view1', {controller: 'View1Ctrl', templateUrl: 'scripts/view1/view1.html'})
        .when('/view2', {controller: 'View2Ctrl', templateUrl: 'scripts/view2/view2.html'})
        .otherwise({redirectTo: '/view1'});
}]);
