(function () {

    angular
        .module('imageGalleryApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'imageGalleryData'];
    
    function homeController ($scope, imageGalleryData) {
        var vm = this;
        vm.pageHeader = {
            title: 'The Image Gallery',
            subtitle: 'A user supported collection of beautiful images'
        };

        vm.message = 'Loading images...';
        imageGalleryData.getAllImages()
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
    }
})();