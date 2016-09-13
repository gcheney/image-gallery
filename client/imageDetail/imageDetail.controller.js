(function () {
    
    angular
        .module('imageGalleryApp')
        .controller('imageDetailController', imageDetailController);
    
    imageDetailController.$inject = ['$routeParams', '$modal', 'imageGalleryData'];
    
    function imageDetailController($routeParams, $modal, imageGalleryData) {
        var vm = this;
        vm.imageid = $routeParams.imageid;
        
        imageGalleryData.getImageById(vm.imageid)
            .success(function(data) {
                vm.data = { image: data }
            })
            .error(function(e) {
                console.log(e);
            });
        
        vm.commentModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '/commentModal/commentModal.view.html',
                controller: 'commentModalController as vm',
                resolve: {
                    imageData: function() {
                        return {
                            imageid : vm.imageid,
                            imageTitle : vm.data.image.title
                        };
                    }
                }
            });
        };
    }
    
})();