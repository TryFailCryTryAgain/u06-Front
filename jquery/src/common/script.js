
$(document).ready(function () {

    const $button = $("#browse_books");
    $button?.on('click', function () {
        console.log("Event has been registered");
        window.location.assign("/jquery/src/pages/books.html");
    });

    const url = `https://restful-api-sca9.onrender.com`;
    const userUrl = 'https://restful-api-sca9.onrender.com/book/';
    const orderUrl = 'https://restful-api-sca9.onrender.com/order/';

    function fetchOrderData() {
        $.get(orderUrl)
            .done(function(data) {
                console.log(data);
            })
            .fail(function(err) {
                console.log("Error:", err);
            });
    }

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

    function fetchAndPopulateGenres() {
        $.get(userUrl)
            .done(function(data) {
                if (Array.isArray(data) && data.length > 0) {
                    const genres = [...new Set(data.map(book => book.genre))];
                    
                    const dropdownMenu = $('.dropdown-menu');
                    dropdownMenu.empty();
                    
                    genres.forEach(genre => {
                        dropdownMenu.append(
                            `<li><a href="#" class="genre-link" data-genre="${genre}">${genre}</a></li>`
                        );
                    });
                    
                    $('.genre-link').click(function(e) {
                        e.preventDefault();
                        const genre = $(this).data('genre');
                        const encodedGenre = encodeURIComponent(genre);
                        const basePath = window.location.pathname.includes('/jquery/src/') ? '/jquery/src' : '';
                        window.location.href = `${basePath}/pages/book_genre.html?genre=${encodedGenre}`;
                    });
                }
            })
            .fail(function(error) {
                console.error('Error fetching genres:', error);
                $('.dropdown-menu').html('<li>Error loading genres</li>');
        });
    }

    function initDropdown() {
        $('.dropdown-toggle').click(function(e) {
            e.preventDefault();
            $(this).siblings('.dropdown-menu').toggle();
        });
        
        $(document).click(function(e) {
            if (!$(e.target).closest('.dropdown').length) {
                $('.dropdown-menu').hide();
            }
        });
        
        $('.dropdown-menu').click(function(e) {
            e.stopPropagation();
        });
    }

    initDropdown();
    fetchAndPopulateGenres();
    fetchOrderData();
});