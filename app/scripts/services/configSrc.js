angular.module('tappr.services').
factory('configSrc', function($http) {

    var service = {},
        url = '//localhost:8001',
        overrideChecked;

    service.getURL = function () {

        return url;

    };

    service.checkOverride = function(){
        $http({
            method: 'GET',
            url: '/config.json'
        })
            .success(function (result) {
                url = '//' + result.server + ':8001';
                overrideChecked = true;
                console.log('OVERRIDE FOUND: configSrc: checkOverride: ', url);
            })
            .error(function (error, status) {

                if( status === 404 ){
                    overrideChecked = true;
                } else {
                    console.log('ERROR: configSrc: getURL: ', error, status);
                }

            });

    };

    return service;
});
