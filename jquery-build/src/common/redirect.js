$(document).ready(function () {

    function RedirectContact() {
        $('#contact').click(function(e) {
            e.preventDefault();
            const basePath = window.location.pathname.includes('/jquery/src/') ? '/jquery/src' : '';
            window.location.href = `${basePath}/pages/contact_us.html`;
        });
    }

    function RedirectAdmin() {
        $('#admin').click(function(e) {
            e.preventDefault();
            const basePath = window.location.pathname.includes('/jquery/src/') ? '/jquery/src' : '';
            window.location.href = `${basePath}/pages/admin.html`;
        });
    }

    function RedirectUser() {
        $('#user').click(function(e) {
            e.preventDefault();
            const basePath = window.location.pathname.includes('/jquery/src/') ? '/jquery/src' : '';
            window.location.href = `${basePath}/pages/user.html`;
        });
    }

    RedirectContact();
    RedirectAdmin();
    RedirectUser();
});