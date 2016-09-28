(function () {
    angular
        .module('imageGalleryApp')
        .controller('updateCommentModalController', updateCommentModalController);
    
    updateCommentModalController.$inject = ['$modalInstance', 'imageGalleryData', 'imageData'];
    
    function updateCommentModalController ($modalInstance, imageGalleryData, imageData) {
        var vm = this;
        vm.imageData = imageData;
        vm.formData = {};
        vm.formData.content = vm.imageData.comment.content;
        
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
            var commentid = vm.imageData.comment._id;
            imageGalleryData.updateCommentById(imageid, commentid, {
                content: formData.content
            })
            .success(function (data) {
                vm.modal.close(data);
            })
            .error(function (data) {
                vm.formError = 'Comment not updated, please try again.';
            });
            
            return false;
        };
        
        vm.modal = {
            close: function (updatedCommentData) {
                $modalInstance.close(updatedCommentData);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();