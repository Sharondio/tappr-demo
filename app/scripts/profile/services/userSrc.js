angular.module('tappr.common').
    factory('userSrc', userSrc);

userSrc.$inject = ['$http','$cookieStore'];

function userSrc ($http, $cookieStore) {

    var service = {};
    var url = '//localhost:8001/user';

    service.user = {};

    service.login = function (username) {
        return $http({
            method: 'GET',
            url: url + '/' + username
        }).success(function (results) {
            service.user = results;
            console.log('SERVICE: putting cookie: ', username);
            $cookieStore.put('login', username);
            return results;
        }).error(function (error) {
            return error;
        });
    };

    service.logout = function () {
        service.user = {};
        $cookieStore.remove('login');
        return true;
    };

    service.create = function (username) {
        return $http({
            method: 'POST',
            url: url,
            data: {username: username}
        }).success(function (results) {
            $cookieStore.put('login', username);
            service.user = {
                username: username,
                favorites: [],
                ratings: []
            };
            return results;
        }).error(function (error) {
            return error;
        });
    };

    service.getRating = function (beer) {
        console.log('SERVICE: getRating: ', beer, service.user.username);
        return $http({
            method: 'GET',
            url: url + '/' + service.user.username + '/rating/beer/' + beer.id
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

    service.getFavorite = function (beer) {
        return $http({
            method: 'GET',
            url: url + '/' + service.user.username + '/favorite/beer/' + beer.id
        }).success(function (results) {
            return results;
        }).error (function (error, code) {
            console.log('ERROR: userSrc: getFavoriteStatus: ', error, code);
            return false;
        });
    };

    service.addFavorite = function (beer) {
        return $http({
            method: 'POST',
            url: '//localhost:8001/user/' + service.user.username + '/favorite/beer',
            data: {
                'name': beer.name,
                'id': beer.id
            }
        }).success(function (results) {
            service.refreshUser();
            return results;
        }).error(function (error) {
            console.log('ERROR: userSvc: addFavorite', error);
            return false;
        });
    };

    service.unFavorite = function (beer) {
        return $http({
            method: 'DELETE',
            url: '//localhost:8001/user/' + service.user.username + '/favorite/beer/' + beer.id,
        }).success(function (results) {
            service.refreshUser();
            return results;
        }).error(function (error) {
            console.log('ERROR: userSvc: unFavorite', error);
            return false;
        });
    };

    service.addRating = function (beer, rating) {
        return $http({
            method: 'POST',
            url: '//localhost:8001/user/' + service.user.username + '/rating/beer',
            data: {
                'name': beer.name,
                'id': beer.id,
                'rating': rating
            }
        }).success(function (results) {
            service.refreshUser();
            return results;
        }).error(function (error) {
            console.log('ERROR: userSvc: addRating', error);
            return false;
        });
    };

    service.unRate = function (beer) {
        return $http({
            method: 'DELETE',
            url: '//localhost:8001/user/' + service.user.username + '/rating/beer/' + beer.id
        }).success(function (results) {
            service.refreshUser();
            return results;
        }).error(function (error) {
            console.log('ERROR: userSvc: unRate', error);
        });
    };

    service.refreshUser = function(username) {
        var userVar = username ? username : service.user.username;
        return $http({
            method: 'GET',
            url: '//localhost:8001/user/' + userVar
        }).success(function (results) {
            service.user = results
            console.log('SERVICE: userSrc: refreshUser: ', service.user);
            return results;
        }).error(function (error) {
            console.log('ERROR: userSvc: refreshUser: ', error);
            return error;
        });
    };

    return service;
}