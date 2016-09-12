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
    }
})();