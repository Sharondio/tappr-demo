angular.module('tappr.beers')
    .controller('BeerSearchCtrl', BeerSearchCtrl);

BeerSearchCtrl.$inject = ['$state', '$stateParams', 'beerSrc'];

function BeerSearchCtrl ($state, $stateParams, beerSrc) {

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

        beerSrc.find( $stateParams.query )
            .then(
            function(result){
                vm.beers = result.data;
            },
            function(error){
                console.log('OOPS!', error);
            }
        );

    }

    init();

    vm.load = function (beer) {
        $state.go('root.beers.detail', {id: beer.id});
    };

    vm.catFilter = function(beer) {
        return vm.filterItems[beer.category];
    };
}