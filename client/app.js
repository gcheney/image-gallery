(function () {

    angular.module('imageGalleryApp', ['ngRoute']);

    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }

    angular
        .module('imageGalleryApp')
        .config(['$routeProvider', config]);

})();