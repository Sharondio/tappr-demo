angular.module('tappr.main', [])

    .controller('MainCtrl', ['$scope', function($scope) {

        function init () {
            console.log('MainCtrl Inited');
        }

        init();
    }]);
