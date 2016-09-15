(function() {
    
    angular
        .module('imageGalleryApp')
        .controller('navigationController', navigationController);
    
    navigationController.$inject = ['$location', 'authentication'];
    
    function navigationController($location, authentication) {
        var vm = this;
        
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.getCurrentUser();
        
        // log user out and redirect to homepage
        vm.logout = function() {
            authentication.logout();
            $location.path('/');
        };
    }
})();