angular.module('tappr.beers')
    .controller('BeerSearchCtrl', BeerSearchCtrl);

BeerSearchCtrl.$inject = ['$location', '$routeParams', 'beerSrc', 'messageSrc'];

function BeerSearchCtrl ($location, $routeParams, beerSrc, messageSrc) {

    var vm = this;

    function init () {

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

        beerSrc.find( $routeParams.query )
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

    vm.load = function (beer) {
        console.log('Loading beer: ', beer);
        $location.url('/beers/detail/' + beer.id);
    };

    vm.catFilter = function(beer) {
        return vm.filterItems[beer.category];
    };
}
