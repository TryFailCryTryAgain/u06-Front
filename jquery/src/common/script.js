$(function() {
    function BrowseBooksButton() {
        return $('#browse_books');
    }

    const $button = BrowseBooksButton();
    $button?.on('click', function() {
        console.log("Event has been registered!");
    });
});