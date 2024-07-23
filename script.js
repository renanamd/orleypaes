$(document).ready(function() {
    
    $('.offcanvas-body .nav-item').on('click', function () {
        var offcanvasElement = document.querySelector('.offcanvas');
        var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        bsOffcanvas.hide();
    });
   
});
