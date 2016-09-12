(function () {
    angular
        .module('imageGalleryApp')
        .controller('commentModalController', commentModalController);
    
    commentModalController.$inject = ['$modalInstance', 'imageData'];
    
    function commentModalController ($modalInstance, imageData) {
        var vm = this;
        vm.imageData = imageData;
        
        vm.modal = {
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData) {
                vm.formError = "All fields required, please try again";
                return false;
            } else if (!vm.formData.name) {
                vm.formError = "Please include your name";
                return false;
            } else if (!vm.formData.content) {
                vm.formError = "Please include a comment";
                return false;
            } else {
                console.log(vm.formData);
                return false;
            }
        };
    }
})();