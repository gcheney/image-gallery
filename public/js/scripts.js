$(document).ready(function(){
    
    //add image transition on hover
    $('.image').hover(function() {
        $(this).addClass('transition');  
    }, function() {
        $(this).removeClass('transition');
    });
});