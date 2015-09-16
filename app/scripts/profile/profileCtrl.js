angular.module('tappr.profile', [])

.controller('ProfileCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.messages = [];
    $scope.user = {};

    function init () {
        console.log('INIT');
        $scope.messages.push('ProfileCtrl is initted');
    }

    $http({
					method: 'GET',
					url: '//localhost:8001/user/SharonDio',
					params: params,
					cache: useCached
				})
					.success(function (data) {
						$scope.user = data;
						console.log( data );
					})
					.error(function (data, status) {
						console.log('OOPS!');
					});

    init();
}]);
