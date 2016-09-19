(function () {
    angular
        .module('imageGalleryApp')
        .controller('addImageModalController', addImageModalController);
    
    addImageModalController.$inject = ['$modalInstance', 'imageGalleryData'];
    
    function addImageModalController ($modalInstance, imageGalleryData) {
        var vm = this;
        
        vm.onSubmit = function() {
            vm.formError = '';
            if (!vm.formData) {
                vm.formError = 'All fields are required.';
                return false;
            } else if (!vm.formData.content) {
                vm.formError = 'Please leave a comment.';
                return false;
            } else {
                vm.addComment(vm.imageData.imageid, vm.formData);
            }
        };
        
        vm.addImage = function(formData) {
            imageGalleryData.addImage(formData)
            .success(function (data) {
                vm.modal.close(data);
            })
            .error(function (data) {
                vm.formError = 'Comment not saved, please try again.';
            });
            
            return false;
        };
        
        vm.modal = {
            close: function (newImageData) {
                $modalInstance.close(newImageData);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();