$(document).ready(function(){
    
    //add image transition on hover
    $('.thumbnail').hover(function() {
        $(this).addClass('transition');  
    }, function() {
        $(this).removeClass('transition');
    });
});