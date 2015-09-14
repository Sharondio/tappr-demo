
angular.module('tappr', [
    'ngRoute',
    'tappr.main',
    'tappr.view1',
    'tappr.view2'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/view1', {controller: 'View1Ctrl', templateUrl: 'view1/view1.html'})
        .when('/view2', {controller: 'View2Ctrl', templateUrl: 'view2/view2.html'})
        .otherwise({redirectTo: '/view1'});
}]);
