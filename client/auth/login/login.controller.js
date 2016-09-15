(function() {
    
    angular
        .module('imageGalleryApp')
        .controller('loginController', loginController);
    
    loginController.$inject = ['$location','authentication'];
    
    function loginController($location, authentication) {
        
        var vm = this;
        vm.pageHeader = {
            title: 'Login To The Image Gallery'
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
                vm.doLogin();
            }
        };
            
        vm.doLogin = function() {
            vm.formError = "";
            
            authentication
                .login(vm.credentials)
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