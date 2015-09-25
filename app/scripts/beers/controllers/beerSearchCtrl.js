angular.module('tappr.beers')
    .controller('BeerSearchCtrl', BeerSearchCtrl);

BeerSearchCtrl.$inject = ['$scope', '$state', '$stateParams', 'beerSrc', 'messageSrc'];

function BeerSearchCtrl ($scope, $state, $stateParams, beerSrc, messageSrc) {

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

        beerSrc.find( $stateParams.query )
            .then(
            function(result){
                console.log('beers found: ', result.data);
                $scope.beers = result.data;
            },
            function(error){
                console.log('OOPS!', error);
            }
        );

    }

    init();

    $scope.$on('handleBroadcast', function() {
        beerSrc.find( messageSrc.message )
            .then(
            function(result){
                $scope.beers = result.data;
            },
            function(error){
                console.log('OOPS!', error);
            }
        );
    });

    $scope.load = function (beer) {
        console.log('Loading beer: ', beer);
        $state.go('root.beers.detail', {id: beer.id});
    };

    $scope.catFilter = function(beer) {
        return $scope.filterItems[beer.category];
    };
}
