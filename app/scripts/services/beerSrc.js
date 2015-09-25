angular.module('tappr.services', []).
factory('beerSrc', function($http, configSrc) {

    var service = {};

    service.find = function (queryTerm) {

        var params = {};
        if(queryTerm){
            params.q = queryTerm;
        }
        return $http({
            method: 'GET',
            url: configSrc.getURL() +  '/beer',
            params: params
        })
            .success(function (result) {
                return result;
            })
            .error(function (data, status) {
                console.log('ERROR: beerSrv: find: ', error);
                return status;
            });

    };

    service.findOne = function (id) {

        return $http({
            method: 'GET',
            url: configSrc.getURL() + '/beer/' + id
        })
            .success(function (result) {
                return result;
            })
            .error(function (data, status) {
                console.log('ERROR: beerSrv: findOne: ', error);
                return status;
            });

    };

    service.listCategories = function () {

        return $http({
            method: 'GET',
            url: configSrc.getURL() + '/category'
        })
            .success(function (result) {
                return result;
            })
            .error(function (data, status) {
                return status;
            });

    };

    return service;
});
