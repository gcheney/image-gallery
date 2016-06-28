$(document).ready(function(){
    
    //add image tranition on hover
    $('.image').hover(function() {
        $(this).addClass('transition');  
    }, function() {
        $(this).removeClass('transition');
    });
});