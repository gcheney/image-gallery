(function () {
    
    angular
        .module('imageGalleryApp')
        .controller('imageDetailController', imageDetailController);
    
    function imageDetailController() {
        var vm = this;
        vm.pageHeader = {
            title: 'Image detail page'
        };
    }
    
})();