// In book_genre.html's JavaScript:
$(document).ready(function() {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Get the genre from URL
    const genre = getUrlParameter('genre');

    if (genre) {
        console.log('Selected genre:', genre);

        $("#book_genre_title").text(`${genre}`);
        // You can now use this genre to filter books
        // For example:
        // fetchBooksByGenre(genre);

        
    } else {
        // Handle case when no genre is specified
        console.log('No genre specified');
        window.location.href = 'index.html'; // or handle differently
    }

    // Function to fetch books by genre
    function fetchBooksByGenre() {
        // First get the genre from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const genre = urlParams.get('genre');
        
        if (!genre) {
            console.error('No genre specified in URL');
            $('#books-container').html('<p class="error">Please select a genre from the homepage</p>');
            return;
        }

        // Display loading state
        $('#books-container').html('<div class="loading">Loading books...</div>');
        
        // Decode the genre (in case it was encoded)
        const decodedGenre = decodeURIComponent(genre);
        $('.page-title').text(`${decodedGenre} Books`);

        // Fetch books from API
        $.get('https://restful-api-sca9.onrender.com/book/')
            .done(function(data) {
                if (Array.isArray(data)) {
                    // Filter books by genre (case insensitive)
                    const genreBooks = data.filter(book => 
                        book.genre && book.genre.toLowerCase() === decodedGenre.toLowerCase()
                    );

                    if (genreBooks.length > 0) {
                        renderBooks(genreBooks);
                    } else {
                        $('#books-container').html(
                            `<p class="no-books">No books found in the ${decodedGenre} genre</p>`
                        );
                    }
                } else {
                    throw new Error('Invalid data format');
                }
            })
            .fail(function(error) {
                console.error('Error fetching books:', error);
                $('#books-container').html(
                    `<p class="error">Error loading books. Please try again later.</p>`
                );
            });
    }

    // Helper function to render books
    function renderBooks(books) {
        const booksContainer = $('#books-container');
        booksContainer.empty();
        
        const booksHtml = books.map(book => `
            <div class="genre_book_card">
                <h2 class="book_title">${book.title || 'Untitled'}</h2>
                <h3 class="author">${book.author || 'Unknown author'}</h3>
                <h3 class="price">$${book.price?.toFixed(2) || '0.00'}</h3>
                <button class="add_to_cart">Add to Cart</button>
            </div>
        `).join('');
        
        booksContainer.html(booksHtml);
    }

    // Call this when book_genre.html loads
    $(document).ready(function() {
        fetchBooksByGenre();
    });
});