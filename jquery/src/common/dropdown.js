$(document).ready(function() {
        // Drop down menu - Homepage

        const userUrl = 'https://restful-api-sca9.onrender.com/book/';

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
});