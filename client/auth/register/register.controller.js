(function() {
    
    angular
        .module('imageGalleryApp')
        .controller('registerController', registerController);
    
    registerController.$inject = ['$location','authentication'];
    
    function registerController($location, authentication) {
        
        var vm = this;
        vm.pageHeader = {
            title: 'Register for Image Gallery'
        };
        
        vm.credentials = {
            username : "",
            password : ""
        };
        
        vm.returnPage = $location.search().page || '/';
        
        vm.onSubmit = function () {
            vm.formError = "";
            
            if (!vm.credentials.username || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
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
                    vm.formError = err;
                })
                .then(function(){
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };
    }
})();