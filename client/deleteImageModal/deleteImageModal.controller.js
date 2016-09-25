(function () {
    angular
        .module('imageGalleryApp')
        .controller('deleteImageModal', deleteImageModal);
    
    deleteImageModal.$inject = ['$location', 'authentication', 
                                '$modalInstance', 'imageGalleryData', 'imageData'];
    
    function deleteImageModal ($location, authentication, 
                                $modalInstance, imageGalleryData, imageData) {
        var vm = this;
        vm.imageData = imageData;
        
        vm.onSubmit = function() {
            vm.deleteImage(vm.imageData.imageid);
        };
        
        vm.deleteImage = function(imageid) {
            var username = authentication.getCurrentUser().username;
            imageGalleryData
                .deleteImageById(imageid)
                .success(function () {
                    $location.path('/users/' + username);
                })
                .error(function(e) {
                    console.log(e);
                });
        };
        
        vm.modal = {
            close: function (newCommentData) {
                $modalInstance.close();
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();