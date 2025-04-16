


// Crud functions to fetch and display the data in the four sections


$(document).ready(function() {




    // API URL calls
    const orderUrl = 'https://restful-api-sca9.onrender.com/order/';
    const bookUrl = 'https://restful-api-sca9.onrender.com/book/';
    const userUrl = 'https://restful-api-sca9.onrender.com/user/';
    const reviewUrl = 'https://restful-api-sca9.onrender.com/review/';

    function fetchOrders() {
        $.get(orderUrl)
            .done(function(data) {
                console.log(data);
                $('#order_container').empty();

                if (Array.isArray(data)) {
                    data.forEach(order => {
                        const booksList = order.bookIds.map(bookId => 
                            `<span>${bookId}</span>`
                        ).join(' ');

                        const orderHtml = `
                            <div class="order_info">
                                <p><strong>Order ID:</strong> ${order._id}</p>
                                <p><strong>User ID:</strong> ${order.userId}</p>
                                <p><strong>Books:</strong> ${booksList}</p>
                                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
                                <p><strong>Status:</strong> ${order.status}</p>
                                <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
                            </div>
                            <div class="order_button">
                                <button class="order_edit" id="order_edit" data-order-id="${order._id}">Edit</button>
                                <button class="order_delete" id="order_delete" data-order-id="${order._id}">Delete</button>
                            </div>                 
                        `;

                        $('#order_container').append(orderHtml);
                    });
                }
            })
            .fail(function(error) {
                console.error('Error: ', error);
            });
    }

    


    function fetchBooks() {
        $.get(bookUrl)
            .done(function(data) {
                console.log(data);
                $('.book_container').empty();

                if (Array.isArray(data)) {
                    data.forEach(book => {

                        const bookHtml = `
                            <div class="book_info">
                                <p><strong>Book ID:</strong> ${book._id}</p>
                                <p><strong>Title:</strong> ${book.title}</p>
                                <p><strong>Author:</strong> ${book.author}</p>
                                <p><strong>Genre:</strong> ${book.genre}</p>
                                <p><strong>Price:</strong> ${book.price}€</p>
                                <p><strong>Stock:</strong> ${book.stock} units</p>
                                <p><strong>Description</strong> ${book.description} </p>
                                <p><strong>Published Date:</strong> ${new Date(book.publishedDate).toLocaleString()} </p>
                            </div>
                            <div class="book_button">
                                <button class="book_edit" id="book_edit" data-book-id="${book._id}">Edit</button>
                                <button class="book_delete" id="book_delete" data-book-id="${book._id}">Delete</button>
                            </div>                 
                        `;

                        $('.book_container').append(bookHtml);
                    });
                }
            })
            .fail(function(error) {
                console.error('Error: ', error);
            });
    }


    function fetchReviews() {
        $.get(reviewUrl)
        .done(function(data) {
            console.log(data);
            $('.review_container').empty();

            if (Array.isArray(data)) {
                data.forEach(reviews => {

                    const reviewHtml = `
                        <div class="review_info">
                            <p><strong>Review ID:</strong> ${reviews._id}</p>
                            <p><strong>Book ID:</strong> ${reviews.bookId}</p>
                            <p><strong>User ID:</strong> ${reviews.userId}</p>
                            <p><strong>Rating:</strong> ${reviews.rating}</p>
                            <p><strong>Comment:</strong> ${reviews.comment}€</p>
                            <p><strong>Create at:</strong> ${new Date(reviews.date).toLocaleString()} </p>
                        </div>
                        <div class="review_button">
                            <button class="review_edit" id="review_edit" data-review-id="${reviews._id}">Edit</button>
                            <button class="review_delete" id="review_delete" data-review-id="${reviews._id}">Delete</button>
                        </div>                 
                    `;

                    $('.review_container').append(reviewHtml);
                });
            }
        })
        .fail(function(error) {
            console.error('Error: ', error);
        });
    }

    function fetchUsers() {
        $.get(userUrl)
        .done(function(data) {
            console.log(data);
            $('.users_container').empty();

            if (Array.isArray(data)) {
                data.forEach(users => {

                    const userHtml = `
                        <div class="users_info">
                            <p><strong>User ID:</strong> ${users._id}</p>
                            <p><strong>First Name:</strong> ${users.first_name}</p>
                            <p><strong>Last Name:</strong> ${users.last_name}</p>
                            <p><strong>Phone:</strong> ${users.phone}</p>
                            <p><strong>Email:</strong> ${users.email}</p>
                            <p><strong>Password:</strong> ${users.password} units</p>
                            <p><strong>Adress:</strong> ${users.adress} </p>
                            <p><strong>ZIP:</strong> ${users.ZIP} </p>
                        </div>
                        <div class="users_button">
                            <button class="users_edit" id="users_edit" data-users-id="${users._id}">Edit</button>
                            <button class="users_delete" id="users_delete" data-users-id="${users._id}">Delete</button>
                        </div>                 
                    `;

                    $('.users_container').append(userHtml);
                });
            }
        })
        .fail(function(error) {
            console.error('Error: ', error);
        });
    }

    fetchOrders();
    fetchBooks();
    fetchReviews();
    fetchUsers();



    function deleteOrder(orderId) {
        if (!confirm("Are you sure you want to delete this order?")) {
            return;
        }
        
        $.ajax({
            url: `${orderUrl}${orderId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("Order deleted successfully:", response);
                alert("Order deleted successfully!");
                fetchOrders();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting order: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }

    function deleteUser(userId) {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        $.ajax({
            url: `${userUrl}${userId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("User deleted successfully:", response);
                alert("User deleted successfully!");
                fetchOrders();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting User: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }

    function deleteReview(reviewId) {
        if (!confirm("Are you sure you want to delete this Review?")) {
            return;
        }

        $.ajax({
            url: `${reviewUrl}${reviewId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("Review deleted successfully:", response);
                alert("Review deleted successfully!");
                fetchOrders();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting Review: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }

    function deleteBook(bookId) {
        if (!confirm("Are you sure you want to delete this Book?")) {
            return;
        }

        $.ajax({
            url: `${bookUrl}${bookId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("Book deleted successfully:", response);
                alert("Book deleted successfully!");
                fetchOrders();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting Book: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }


    // Edit each section


    function editOrder(orderId) {

        const specificOrderUrl = `${orderUrl}${orderId}`;

        $.get(specificOrderUrl)
            .done(function(data) {
                
                const bookListHTml = data.bookIds.map()



            });

    }

    function editUser(userId) {

    }

    function editReview(reviewId) {

    }

    function editBook(bookId) {

    }

    // Create for each section

    function createOrder() {

    }

    function createUser() {

    }

    function createReview() {

    }

    function createBook() {

    }



    // Event listners for each button

    // Orders
    $(document).off('click', '#order_edit').on('click', '#order_edit', function() {
        console.log("event registered for orders");
    });

    $(document).off('click', '#order_delete').on('click', '#order_delete', function() {
        console.log("event registered for delete orders");
        const orderId = $(this).data('order-id');
        deleteOrder(orderId);
    });

    $(document).off('click', '#create_order').on('click', '#create_order', function() {
        console.log("event registered for create orders");
    });

    // Users
    $(document).off('click', '#users_edit').on('click', '#users_edit', function() {
        console.log("Event registered for users!");
    });

    $(document).off('click', '#users_delete').on('click', '#users_delete', function() {
        console.log("Event registered for delete users!");
        const userId = $(this).data('user-id');
        deleteUser(userId);
    });

    $(document).off('click', '#create_user').on('click', '#create_user', function() {
        console.log("Event registered for create users!");
    });

    // Books
    $(document).off('click', '#book_edit').on('click', '#book_edit', function() {
        console.log("Event registered for books!");
    });

    $(document).off('click', '#book_delete').on('click', '#book_delete', function() {
        console.log("Event registered for delete books!");
        const bookId = $(this).data('book-id');
        deleteBook(bookId);
    });

    $(document).off('click', '#create_book').on('click', '#create_book', function() {
        console.log("Event registered for create books!");
    });

    // Reviews
    $(document).off('click', '#review_edit').on('click', '#review_edit', function() {
        console.log("Event registered for reviews!");
    });

    $(document).off('click', '#review_delete').on('click', '#review_delete', function() {
        console.log("Event registered for delete reviews!");
        const reviewId = $(this).data('review-id');
        deleteReview(reviewId);
    });

    $(document).off('click', '#create_review').on('click', '#create_review', function() {
        console.log("Event registered for create reviews!");
    });

});