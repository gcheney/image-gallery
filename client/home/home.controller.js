(function () {

    angular
        .module('imageGalleryApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'imageGalleryData', 
                              '$location', '$modal', 'authentication'];
    
    function homeController ($scope, imageGalleryData, 
                              $location, $modal, authentication) {
        var vm = this;

        vm.message = 'Loading images...';
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();
        vm.featuredImage = {};
        
        imageGalleryData.getAllImages()
            .success(function(imageData) {
                vm.message = imageData.length > 0 ? '' : 'No images found';
                if (imageData.length % 2 !== 0) {
                    vm.featuredImage = imageData.shift();
                }
                vm.data = { images: imageData };
            })
            .error(function (e) {
                vm.message = 'Sorry, there was an error with our system';
                console.log(e);
            });

        vm.showError = function (error) {
            $scope.$apply(function() {
                vm.message = error.message;
            });
        };
        
        vm.addImageModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '/addImageModal/addImageModal.view.html',
                controller: 'addImageModalController as vm'
            });
            
            modalInstance.result.then(function (newImageData) {
                vm.data.images.unshift(newImageData);
                if (vm.data.images.length % 2 !== 0) {
                    vm.featuredImage = vm.data.images.shift();
                } else {
                    vm.data.images.splice(1, 0, vm.featuredImage);
                    vm.featuredImage = {};
                }
            });
        };
        
        vm.hasFeaturedImage = function() {
            return vm.featuredImage.hasOwnProperty('url');
        };
    }
})();