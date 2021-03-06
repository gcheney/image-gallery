(function () {

    angular
        .module('imageGalleryApp')
        .controller('usersController', usersController);

    usersController.$inject = ['$routeParams', '$scope', 'imageGalleryData', 
                              '$location', '$modal', 'authentication'];
    
    function usersController ($routeParams, $scope, imageGalleryData, 
                              $location, $modal, authentication) {
        var vm = this;

        vm.message = 'Loading images...';
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();
        vm.username = $routeParams.username;
        
        vm.currentUsersAccount = isCurrentUsersAccount(vm.username); 
        
        imageGalleryData
            .getImagesByUsername(vm.username)
            .success(function(data) {
                vm.message = data.length > 0 ? '' : 'No images found';
                vm.data = { images: data };
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
            });
        };
        
        function isCurrentUsersAccount(username) {
            return authentication.isLoggedIn() 
                && authentication.getCurrentUser().username === username;
        };
    }
})();