(function() {
    
    angular
        .module('imageGalleryApp')
        .controller('registerController', registerController);
    
    registerController.$inject = ['$location','authentication'];
    
    function registerController($location, authentication) {
        
        var vm = this;
        vm.pageHeader = {
            title: 'Register for The Image Gallery'
        };
        
        vm.credentials = {
            username : "",
            password : ""
        };
        
        vm.returnPage = $location.search().page || '/';
        
        vm.onSubmit = function () {
            vm.formError = "";
            
            if (!vm.credentials.username) {
                vm.formError = 'Please enter your new username';
                return false;
            } else if (!vm.credentials.password) {
                vm.formError = 'Please enter your password';
                return false;
            } else {
                vm.doRegister();
            }
        };
            
        vm.doRegister = function() {
            vm.formError = "";
            
            authentication
                .register(vm.credentials)
                .error(function(err){
                    vm.formError = err.message;
                })
                .then(function(){
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };
    }
})();