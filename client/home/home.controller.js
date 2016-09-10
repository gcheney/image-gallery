(function () {

    angular
        .module('imageGalleryApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'imageData'];
    
    function homeController ($scope, imageData) {
        var vm = this;
        vm.pageHeader = {
            title: 'The Image Gallery',
            strapline: 'A user supported collection of beautiful images'
        };

        vm.message = 'Searching for images...';
        imageData
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