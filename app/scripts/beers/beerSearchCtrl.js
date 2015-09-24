angular.module('tappr.beersearch', [])

.controller('BeerSearchCtrl', ['$scope', '$location', 'beerSrc', '$routeParams',
    function($scope, $location, beerSrc, $routeParams) {

        function init () {
            console.log('INIT');

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

            beerSrc.find($routeParams.query)
                .then(
                    function(result){
                        $scope.beers = result.data;
                        console.log('beers: ', result.data);
                    },
                    function(error){
                        console.log('OOPS!', error);
                    }
                );

        }

        init();

        $scope.load = function (beer) {
            console.log('Loading beer: ', beer);
            $location.url('/beers/detail/' + beer.id);
        };

        $scope.catFilter = function(beer) {
            return $scope.filterItems[beer.category];
        };
    }]);
