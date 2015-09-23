angular.module('tappr.services', []).
    factory('beerSvc', function($http) {

        var service = {};
        var url = '//localhost:8001/beer';

        service.find = function (queryTerm) {
            return $http.get(url + '?q=' + queryTerm)
                .success(function (data) {
                    return data;
                })
                .error( function (error) {
                    console.log('ERROR: beerSrv: find: ', error);
                    return;
                });
        };

        service.findOne = function (id) {
            return $http.get(url + '/' + id)
                .success(function (data) {
                    return data;
                })
                .error( function (error) {
                    console.log('ERROR: beerSrv: find: ', error);
                    return;
                });
        };

        return service;
    }
);