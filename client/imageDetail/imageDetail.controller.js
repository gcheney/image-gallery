(function () {
    
    angular
        .module('imageGalleryApp')
        .controller('imageDetailController', imageDetailController);
    
    imageDetailController.$inject = ['$routeParams', 'imageData'];
    
    function imageDetailController($routeParams, imageData) {
        var vm = this;
        vm.imageid = $routeParams.imageid;
        
        imageData.getImageById(vm.imageid)
            .success(function(data) {
                vm.data = { image: data }
                vm.pageHeader = {
                    title: vm.data.image.title
                };  
            })
            .error(function(e) {
                console.log(e);
            });
    }
    
})();