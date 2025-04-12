
$(document).ready(function () {

    const $button = $("#browse_books");
    $button?.on('click', function () {
        console.log("Event has been registered");
        window.location.assign("/jquery/src/pages/books.html");
    });

    const url = `https://restful-api-sca9.onrender.com`;
    const userUrl = 'https://restful-api-sca9.onrender.com/book/';

    function fetchUserData() {
        console.log("Event has been registered!");
        $.get(userUrl)
            .done(function(data) {
                console.log('Data received:', data);
                
                // Check if data is an array
                if (Array.isArray(data)) {
                    let genres = data.map(book => book.genre).join(', ');
                    let titles = data.map(book => book.title).join(', ');

                    let genreList = data.map(book => `<li>${book.genre}, ${book.title}`).join('');
                    $('#results').append(`<ul>${genreList}</ul>`);

                    // $('#results').append(`Genres: ${genres}`);
                    // $('#results').append(`Titles: ${titles}`);
                    
                    // Alternatively, display in a list format:
                    // let genreList = data.map(book => `<li>${book.genre}</li>`).join('');
                    // $('#results').html(`<ul>${genreList}</ul>`);
                } else {
                    $('#results').html('<p>No valid book data found</p>');
                }
            })
            .fail(function(error) {
                console.error('Error:', error);
                $('#results').html('<p>Error loading data</p>');
            });
    }
    
    $('#fetch').on('click', fetchUserData);

    function FeaturedBooks() {
        
        $.get(userUrl)
            .done(function(data) {
                console.log('Data Received:', data);
    
                if (Array.isArray(data)) {
                    const limit = 6;
                    const limitedData = data.slice(0, limit);
    
                    let bookList = limitedData.map(book => `
                        <div class="book_card">
                            <h2>${book.title}</h2>
                            <h3>$${book.price}</h3>
                        </div>
                    `).join('');
                    
                    $('#featured_books').append(bookList);
                } else {
                    $('#featured_books').html('<p>No valid book data found</p>');
                }
            })
            .fail(function(error) {
                console.error('Error:', error);
                $('#featured_books').html('<p>Error loading data</p>');
            });
    }

    $(document).ready(function () {
        FeaturedBooks();
    });
    
});