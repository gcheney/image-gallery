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