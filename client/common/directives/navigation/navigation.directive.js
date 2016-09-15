(function () {
    
    angular
        .module('imageGalleryApp')
        .directive('navigation', navigation);
    
    function navigation () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/navigation.template.html',
            controller: 'navigationController as navvm'
        };
    }
})();