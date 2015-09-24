angular.module('tappr.common')
    .factory('beerSrc', beerSrc);

function beerSrc ($http) {

    var service = {};
    var url = '//localhost:8001';

    service.find = function (queryTerm) {

        var params = {};
        if(queryTerm){
            params.q = queryTerm;
        }
        return $http({
                method: 'GET',
                url: url + '/beer',
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
                url: url + '/beer/' + id
            })
            .success(function (result) {
                console.log('SERVICE: beer.findOne: ', result);
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
            url: url + '/category'
        })
            .success(function (result) {
                return result;
            })
            .error(function (data, status) {
                return status;
            });

    };

    return service;
}