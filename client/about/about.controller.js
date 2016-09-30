(function () {
    angular
        .module('imageGalleryApp')
        .controller('aboutController', aboutController);
    
    function aboutController() {
        var vm = this;
        vm.pageHeader = {
            title: 'About The Image Gallery',
        };
        
        vm.main = {
            content: 'The Image Gallery was created by <a href="https://glendoncheney.com" target="_blank">Glendon Cheney</a> as a place for people to upload their favorite images.\n\n It was created using the MEAN stack, is open source and maintained on <a href="https://github.com/gcheney/image-gallery" target="_blank">Github.</a>'
        };
    }
})();