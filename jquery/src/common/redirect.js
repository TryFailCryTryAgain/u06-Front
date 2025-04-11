$(document).ready(function () {

    function RedirectContact() {
        $('#contact').click(function(e) {
            e.preventDefault();
            const basePath = window.location.pathname.includes('/jquery/src/') ? '/jquery/src' : '';
            window.location.href = `${basePath}/pages/contact_us.html?genre`;
        });
    }

    RedirectContact();
});