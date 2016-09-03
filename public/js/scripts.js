$(document).ready(function(){
    
    //add image transition on hover
    $('.img-hover').hover(function() {
        $(this).addClass('transition');  
    }, function() {
        $(this).removeClass('transition');
    });
    
});