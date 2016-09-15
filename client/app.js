(function () {

    angular.module('imageGalleryApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

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
            .when('/images/:imageid', {
                templateUrl: '/imageDetail/imageDetail.view.html',
                controller: 'imageDetailController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerController',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        
        $locationProvider.html5Mode(true);
    }

    angular
        .module('imageGalleryApp')
        .config(['$routeProvider', '$locationProvider', config]);

})();