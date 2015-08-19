'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.messages = [];
    $scope.url = 'ws://localhost:8080/teacherspace-ws/v1/projection/123';
    //$scope.url = 'ws://echo.websocket.org';

    var ws = null;
    var connected = false;

    $scope.messages = [];

    var open = function() {
        ws = new WebSocket($scope.url);
        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onmessage = onMessage;
        ws.onerror = onError;

        $scope.connectionStatus = "OPENING...";
    }

    var close = function() {
        if (ws) {
            console.log('CLOSING ...');
            ws.close();
        }
        connected = false;
        $scope.connectionStatus = 'CLOSED';
    }

    var onOpen = function() {
        console.log('OPENED');
        connected = true;
        $scope.connectionStatus = "OPEN";
    };

    var onClose = function() {
        console.log('CLOSED: ' + $scope.url);
        ws = null;
    };

    var onMessage = function(event) {
        console.log("received message: ", event);
        var data = event.data;
        $scope.$apply(addMessage(data));
    };

    var onError = function(event) {
        alert(event.data);
    };

    var addMessage = function(data) {
        console.log("adding message: ", data);
        $scope.messages.push(data);
    };

    $scope.sendMessage = function(data, type) {
        var msg = $scope.message;
        console.log("sending message: ", $scope.message);
        ws.send(msg);
    }

    function init () {
        open();
        console.log("INIT");
    }

    init();
}]);