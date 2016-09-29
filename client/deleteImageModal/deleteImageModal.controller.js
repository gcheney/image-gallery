(function () {
    angular
        .module('imageGalleryApp')
        .controller('deleteImageModalController', deleteImageModalController);
    
    deleteImageModalController.$inject = ['$location', 'authentication', 
                                '$modalInstance', 'imageGalleryData', 'imageData'];
    
    function deleteImageModalController($location, authentication, 
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
                .success(function() {
                    $modalInstance.close();
                    $location.path('/users/' + username);
                })
                .error(function(e) {
                    console.log(e);
                });
        };
        
        vm.modal = {
            close: function() {
                $modalInstance.close();
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();