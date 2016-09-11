(function () {
    
    angular
        .module('imageGalleryApp')
        .controller('imageDetailController', imageDetailController);
    
    imageDetailController.$inject = ['$routeParams', '$modal', 'imageData'];
    
    function imageDetailController($routeParams, $modal, imageData) {
        var vm = this;
        vm.imageid = $routeParams.imageid;
        
        imageData.getImageById(vm.imageid)
            .success(function(data) {
                vm.data = { image: data }
            })
            .error(function(e) {
                console.log(e);
            });
        
        vm.commentModal = function () {
            alert("Let's add a comment!");
        };
    }
    
})();