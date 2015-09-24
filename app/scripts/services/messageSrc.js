angular.module('tappr.services').
    factory('messageSrc', function($rootScope) {

        var service = {};

        service.broadcast = function (msg) {
            this.message = msg;
            this.broadcastItem();
        };

        service.broadcastItem = function () {
            $rootScope.$broadcast('handleBroadcast');
        };

        return service;

    });