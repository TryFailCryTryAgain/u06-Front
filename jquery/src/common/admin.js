$(document).ready(function() {

    const orderUrl = 'https://restful-api-sca9.onrender.com/order/';
    const bookUrl = 'https://restful-api-sca9.onrender.com/book/';

    function fetchOrders() {
        $.get(orderUrl)
            .done(function(data) {
                console.log(data);
                $('#order_container').empty();
    
                if (Array.isArray(data)) {
                    data.forEach(order => {
                        // Note: You can't take the bookIds and look up the corrosponding title because the API doesnt have that route implimented in it atm
                        const booksList = order.bookIds.map(bookId => 
                            `<span class="book-id">${bookId}</span>`
                        ).join(', ');
    
                        const orderHtml = `
                            <div class="order_info">
                                <p><strong>Order ID:</strong> ${order._id}</p>
                                <p><strong>User ID:</strong> ${order.userId}</p>
                                <p><strong>Books:</strong> ${booksList}</p>
                                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
                                <p><strong>Status:</strong> ${order.status}</p>
                                <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
                            </div>
                            <div class="order_buttons">
                                <button class="edit" id="edit" data-order-id="${order._id}">Edit</button>
                                <button class="delete" data-order-id="${order._id}">Delete</button>
                            </div>
                        `;
                        
                        $('#order_container').append(orderHtml);
                    });
                }
            })
            .fail(function(error) {
                console.error('Error:', error);
                $('#order_container').html('<p>Error loading orders. Please try again.</p>');
            });
    }

    function editSpecificOrder(orderId) {

        const specificOrderUrl = `${orderUrl}${orderId}`;

        $.get(specificOrderUrl)
            .done(function(data) {
                console.log(data);
                // Make a window visable,
                // Add the (data) into the window using the const SpecificOrderHtml 
                // Rows for dynamic adding order_id, user_id, Book_ids, order_Date, status, total amount
                // What can be edited? user_id and book_ids using the put url in another function
            })
            .fail(function(error) {
                console.error('Error:', error);
            });
    }


    function fetchBooks() {
        $.get(bookUrl)
        .done(function(data) {
            console.log(data);
            $('#book_list').empty();

            if (Array.isArray(data)) {
                data.forEach(book => {
                    const bookHtml = `
                        <div class="book_info">
                            <p><strong>Book ID:</strong> ${book._id}</p>
                            <p><strong>Title:</strong> ${book.title}</p>
                            <p><strong>Genre:</strong> ${book.genre}</p>
                            <p><strong>Description:</strong> ${book.description}</p>
                            <p><strong>Author:</strong> ${book.author}</p>
                            <p><strong>Price:</strong> ${book.price}</p>
                            <p><strong>Stock:</strong> ${book.stock}</p>
                            <p><strong>PublishedDate:</strong> ${book.publishedDate}</p>
                        </div>
                        <div class="book_buttons">
                            <button class="edit" data-book-id="${book._id}">Edit</button>
                            <button class="delete" data-book-id="${book._id}">Delete</button>
                        </div>
                    `;
                    
                    $('#book_list').append(bookHtml);
                });
            }
        })
        .fail(function(error) {
            console.error('Error:', error);
            $('#book_list').html('<p>Error loading orders. Please try again.</p>');
        });
    }


    $(document).on('click', '#edit', function() {
        const orderId = $(this).data('order-id');
        editSpecificOrder(orderId);
    });


    // Added functionallity regarding the popup windoww

    function OpenEditWindow() {
        
    }


    document.body.classList.add('modal-open');
    document.querySelector('.specific_order').style.display = 'block';

    document.body.classList.remove('modal-open');
    document.querySelector('.specific_order').style.display = 'none';

    fetchOrders();
    fetchBooks();


});