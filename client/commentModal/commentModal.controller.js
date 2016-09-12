(function () {
    angular
        .module('imageGalleryApp')
        .controller('commentModalController', commentModalController);
    
    commentModalController.$inject = ['$modalInstance'];
    
    function commentModalController ($modalInstance) {
        var vm = this;
        vm.modal = {
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();