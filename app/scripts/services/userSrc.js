angular.module('tappr.services').
    factory('userSrc', function($http, configSrc) {

        var service = {};

        service.login = function (username) {
            return $http({
                method: 'GET',
                url: configSrc.getURL() + '/user/' + username
            }).success(function (results) {
                return results;
            }).error(function (error) {
                return error;
            });
        };

        service.create = function (username) {
            return $http({
                method: 'POST',
                url: configSrc.getURL() + '/user',
                data: {username: username}
            }).success(function (results) {
                return results;
            }).error(function (error) {
                return error;
            });
        };

        service.getRatings = function (user) {
            return $http({
                method: 'GET',
                url: configSrc.getURL() + '/user/' + user + '/rating/beer'
            }).success(function (results) {
                return results;
            }).error(function (error) {
                console.log('ERROR: userSrc: getRatings: ', error);
                return false;
            });
        };

        service.getFavorites = function (user) {
            return $http({
                method: 'GET',
                url: configSrc.getURL() + '/user/' + user + '/favorite/beer'
            }).success(function (results) {
                return results;
            }).error(function (error) {
                console.log('ERROR: userSrc: getRatings: ', error);
                return false;
            });
        };

        service.getRating = function (user, beer) {
            console.log( beer );
            return $http({
                method: 'GET',
                url: configSrc.getURL() + '/user/' + user + '/rating/beer/' + beer.id
            }).success(function (results) {
                return results;
            }).error(function (error, code) {
                if (code === 404) {
                    return false;
                } else {
                    console.log('ERROR: userSrc: getRating: ', error, code);
                    return false;
                }
            });
        };

        service.getFavorite = function (user, beer) {
            return $http({
                method: 'GET',
                url: configSrc.getURL() + '/user/' + user + '/favorite/beer/' + beer.id
            }).success(function (results) {
                return true;
            }).error (function (error, code) {
                console.log('ERROR: userSrc: getFavoriteStatus: ', error, code);
                return false;
            });
        };

        service.addFavorite = function (user, beer) {
            return $http({
                method: 'POST',
                url: configSrc.getURL() + '/user/' + user + '/favorite/beer',
                data: {
                    'name': beer.name,
                    'id': beer.id
                }
            }).success(function (results) {
                return results;
            }).error(function (error) {
                console.log('ERROR: userSvc: addFavorite', error);
                return false;
            });
        };

        service.unFavorite = function (user, beer) {
            return $http({
                method: 'DELETE',
                url: configSrc.getURL() + '/user/' + user + '/favorite/beer/' + beer.id,
            }).success(function (results) {
                return results;
            }).error(function (error) {
                console.log('ERROR: userSvc: unFavorite', error);
                return false;
            });
        };

        service.addRating = function (user, beer, rating) {
            return $http({
                method: 'POST',
                url: configSrc.getURL() + '/user/' + user + '/rating/beer',
                data: {
                    'name': beer.name,
                    'id': beer.id,
                    'rating': rating
                }
            }).success(function (results) {
                return results;
            }).error(function (error) {
                console.log('ERROR: userSvc: addRating', error);
                return false;
            });
        };

        service.unRate = function (user, beer) {
            return $http({
                method: 'DELETE',
                url: configSrc.getURL() + '/user/' + user + '/rating/beer/' + beer.id
            }).success(function (results) {
                return results;
            }).error(function (error) {
                console.log('ERROR: userSvc: unRate', error);
            });
        };

        return service;
    }
);
