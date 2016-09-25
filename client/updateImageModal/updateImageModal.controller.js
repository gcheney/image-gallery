(function () {
    angular
        .module('imageGalleryApp')
        .controller('updateImageModalController', updateImageModalController);
    
    updateImageModalController.$inject = ['authentication', '$modalInstance', 
                                'imageGalleryData', 'imageData'];
    
    function updateImageModalController(authentication, $modalInstance, 
                                         imageGalleryData, imageData) {
        var vm = this;
        vm.imageData = imageData;
        
        vm.onSubmit = function() {
            vm.formError = '';
            if (!vm.imageData) {
                vm.formError = 'All fields are required.';
                return false;
            } else if (!vm.imageData.title) {
                vm.formError = 'Please provide the image title';
                return false;
            } else if (!vm.imageData.description) {
                vm.formError = 'Please provide the image description';
                return false;
            } else {
                vm.updateImage(vm.imageData);
            }
        };
        
        vm.updateImage = function(imageData) {
            imageGalleryData
                .updateImageById(imageData.imageid, imageData)
                .success(function(updatedImage) {
                    vm.modal.close(updatedImage)
                })
                .error(function(e) {
                    console.log(e);
                });
        };
        
        vm.modal = {
            close: function(updatedImageData) {
                $modalInstance.close(updatedImageData);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();