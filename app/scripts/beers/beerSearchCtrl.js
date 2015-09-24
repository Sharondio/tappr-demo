angular.module('tappr.beers')
    .controller('BeerSearchCtrl', BeerSearchCtrl);

BeerSearchCtrl.$inject = ['$scope', '$location', '$routeParams', 'beerSrc', 'messageSrc'];

function BeerSearchCtrl ($scope, $location, $routeParams, beerSrc, messageSrc) {
    var vm = this;
    vm.messages = [];

    console.log('routeParams: ', $routeParams);

    function init () {
        console.log('INIT');

        vm.sortValue = 'name';

        beerSrc.listCategories()
            .then(
            function(result){
                vm.categories = result.data;
                vm.filterItems = {};
                for(var cat in vm.categories) {
                    vm.filterItems[vm.categories[cat]] = true;
                }
            },
            function(error){
                console.log('OOPS!', error);
            }
        );

        // initial search
        var searchParams;

        beerSrc.find( searchParams )
            .then(
            function(result){
                console.log('beers found: ', result.data);
                vm.beers = result.data;
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
                vm.beers = result.data;
            },
            function(error){
                console.log('OOPS!', error);
            }
        );
    });

    vm.load = function (beer) {
        console.log('Loading beer: ', beer);
        $location.url('/beers/' + beer.id);
    };

    vm.catFilter = function(beer) {
        return vm.filterItems[beer.category];
    };
}
