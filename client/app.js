(function () {

    angular.module('imageGalleryApp', ['ngRoute']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        
        $locationProvider.html5Mode(true);
    }

    angular
        .module('imageGalleryApp')
        .config(['$routeProvider', '$locationProvider', config]);

})();