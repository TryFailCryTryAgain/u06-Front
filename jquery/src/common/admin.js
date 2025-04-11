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
                                <button class="edit" data-order-id="${order._id}">Edit</button>
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
                            <button class="edit" data-order-id="${book._id}">Edit</button>
                            <button class="delete" data-order-id="${book._id}">Delete</button>
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
    
    fetchOrders();
    fetchBooks();

});