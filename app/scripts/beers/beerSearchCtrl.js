angular.module('tappr.beersearch', [])

.controller('BeerSearchCtrl', ['$scope', '$rootScope', '$http', '$location', 'beerSrc',
        function($scope, $rootScope, $http, $location, beerSrc) {
    $scope.messages = [];

    function init () {
        console.log('INIT');

        var url = '//localhost:8001/';
        var getBeerUrl = url + 'beer';
        var getCategoryUrl = url + 'category';

        $scope.sortValue = 'name';

        beerSrc.listCategories()
            .then(
                function(result){
                    $scope.categories = result.data;
                    $scope.filterItems = {};
                    for(var cat in $scope.categories) {
                        $scope.filterItems[$scope.categories[cat]] = true;
                    }
                },
                function(error){
                    console.log('OOPS!', error);
                }
            );

        // initial search
        var searchParams;
        if ($rootScope.query) {
            searchParams = $rootScope.query;
        }

        beerSrc.find( searchParams )
            .then(
                function(result){
                    $scope.beers = result.data;
                    console.log('beers found: ', result.data);
                },
                function(error){
                    console.log('OOPS!', error);
                }
            );

    }

    init();

    $rootScope.$on('search', function (event, data) {
        console.log('SEARCHING from beerSearchCtrl: ', event, data);

        beerSrc.find( data )
            .then(
                function(result){
                    $scope.beers = data;
                    console.log('beers found: ', data);
                },
                function(error){
                    console.log('OOPS!', error);
                }
            );

    });

    $scope.load = function (beer) {
        console.log('Loading beer: ', beer);
        $location.url('/beers/' + beer.id);
    };

    $scope.catFilter = function(beer) {
        return $scope.filterItems[beer.category];
    };
}]);
