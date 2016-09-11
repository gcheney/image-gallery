(function () {

    angular.module('imageGalleryApp', ['ngRoute', 'ngSanitize']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl: '/common/views/genericText.view.html',
                controller: 'aboutController',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        
        $locationProvider.html5Mode(true);
    }

    angular
        .module('imageGalleryApp')
        .config(['$routeProvider', '$locationProvider', config]);

})();