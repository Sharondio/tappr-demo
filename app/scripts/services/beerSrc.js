angular.module('tappr.services', []).
    factory('beerSrc', function($http) {

        var service = {};
        var url = '//localhost:8001/beer';

        service.find = function (queryTerm) {
            return $http.get(url + '?q=' + queryTerm)
                .success(function (result) {
                    return result;
                })
                .error( function (error) {
                    console.log('ERROR: beerSrv: find: ', error);
                    return;
                });
        };

        service.findOne = function (id) {
            return $http.get(url + '/' + id)
                .success(function (result) {
                    return result;
                })
                .error( function (error) {
                    console.log('ERROR: beerSrv: find: ', error);
                    return;
                });
        };

        return service;
    }
);