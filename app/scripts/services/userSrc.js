angular.module('tappr.common')
    .factory('userSrc', UserSrc);

function UserSrc ($http, $cookieStore) {

    var service = {};
    var url = '//localhost:8001/user';

    service.login = function (username) {
        return $http({
            method: 'GET',
            url: url + '/' + id
        }).success(function (results) {
            return results;
        }).error(function (error, code) {
            if (code === 404) {
                $http({
                    method: 'POST',
                    url: baseUrl,
                    results: {username: $scope.username}
                })
                    .success(function (results) {
                        $cookieStore.put('login', results);
                        return results;
                    })
                    .error(function (error, code) {
                        console.log('ERROR: userSrc: login: ', error);
                        return false;
                    });
            } else {
                console.log('ERROR: userSrc: login: ', error);
            }
        });
    };

    service.getRatings = function (user) {
        return $http({
            method: 'GET',
            url: url + '/' + user + '/rating/beer'
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
            url: url + '/' + user + '/favorite/beer'
        }).success(function (results) {
            return results;
        }).error(function (error) {
            console.log('ERROR: userSrc: getRatings: ', error);
            return false;
        });
    };

    service.getRating = function (user, beer) {
        return $http({
            method: 'GET',
            url: url + '/' + user + '/rating/beer/' + beer.id
        }).success(function (results) {
            return results;
        }).error(function (error, code) {
            if (data === 404) {
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
            url: url + '/' + user + '/favorite/beer/' + beer.id
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
            url: '//localhost:8001/user/' + user + '/favorite/beer',
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
            url: '//localhost:8001/user/' + user + '/favorite/beer/' + beer.id,
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
            url: '//localhost:8001/user/' + user + '/rating/beer',
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

    return service;
}
