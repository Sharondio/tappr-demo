angular.module('tappr.common').
    factory('messageSrc', messageSrc);

function messageSrc ($rootScope) {

    var service = {};

    service.broadcast = function (msg) {
        this.message = msg;
        this.broadcastItem();
    };

    service.broadcastItem = function () {
        $rootScope.$broadcast('handleBroadcast');
    };

    return service;

}