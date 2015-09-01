'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/view1', {controller: 'View1Ctrl', templateUrl: 'view1/view1.html'})
        .otherwise({redirectTo: '/view1'});
}])
