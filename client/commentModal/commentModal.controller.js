(function () {
    angular
        .module('imageGalleryApp')
        .controller('commentModalController', commentModalController);
    
    commentModalController.$inject = ['$modalInstance', 'imageGalleryData', 'imageData'];
    
    function commentModalController ($modalInstance, imageGalleryData, imageData) {
        var vm = this;
        vm.imageData = imageData;
        
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
        
        vm.addComment = function (imageid, formData) {
            imageGalleryData.addCommentById(imageid, {
                content: formData.content
            })
            .success(function (data) {
                vm.modal.close(data);
            })
            .error(function (data) {
                vm.formError = 'Comment not saved, please try again.';
            });
            
            return false;
        };
        
        vm.modal = {
            close: function (newCommentData) {
                $modalInstance.close(newCommentData);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();