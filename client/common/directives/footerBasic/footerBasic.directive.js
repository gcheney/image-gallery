(function() {
    
    angular
        .module('imageGalleryApp')
        .directive('footerBasic', footerBasic);
    
    function footerBasic() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/footerBasic/footerBasic.template.html'
        };
    }
            
})();