$(document).ready(function() {

    // API URL Calls
    const orderUrl = 'https://restful-api-sca9.onrender.com/order/';
    const bookUrl = 'https://restful-api-sca9.onrender.com/book/';
    const userUrl = 'https://restful-api-sca9.onrender.com/user/';

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
                                <button class="delete" id="delete" data-order-id="${order._id}">Delete</button>
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

                const booksHtml = data.bookIds.map(bookId => 
                    `<p class="book-line" data-bookid="${bookId}">
                        <span class="remove-book" data-bookid="${bookId}">&#9747;</span>${bookId}
                    </p>`
                ).join('');

                const specificUserUrl = `${userUrl}/id/${data.userId}`;

                $.get(specificUserUrl)
                    .done(function(user) {
                        
                        const userHtml = user._id ? 
                        `<p id="current_user_id"><span class="remove-user" data-userid="${data.userId}">&#9747;</span>${data.userId}</p>` : 
                        '<p>No user assigned</p>';

                        $(`.user_id_section`).append(userHtml);

                    })
                    .fail(function(error) {
                        console.error('Error: ', error);
                    });

                // Fetch all books for the book list
                $.get(bookUrl)
                    .done(function(bookData) {
                        console.log(bookData);
                        if (Array.isArray(bookData)) {
                            bookData.forEach(book => {
                                const bookOption = `
                                    <option value="${book._id}">${book.title}</option>
                                `;
                                $('#book_titles').append(bookOption);
                            });
                        }
                    })
                    .fail(function(error) {
                        console.error('Error: ', error);
                    });

                $.get(userUrl)
                    .done(function(userData) {
                        console.log(userData);

                        if (Array.isArray(userData)) {
                            userData.forEach(users => {
                                const listuserHtml = `
                                    <option value="${users._id}">${users.first_name} ${users.last_name}</option>
                                `;
                                
                                $(`#usernames`).append(listuserHtml);
                            });
                        }
                        
                    })
                    .fail(function(error) {
                        console.error('Error:', error);
                    });

                
                $(document).on('click', '#add_user_id', function() {
                    const selectedUserId = $("#usernames").val();
                    const selectedUserName = $("#usernames option:selected").text();
                    
                    if (selectedUserId && selectedUserId !== "") {
                        const userHtml = `
                            <p id="current_user_id">
                                <span class="remove-user" data-userid="${selectedUserId}">&#9747;</span>
                                ${selectedUserName} (${selectedUserId})
                            </p>
                        `;
                        $('#current_user_id').html(userHtml);
                    } else {
                        alert("Please select a user first");
                    }
                });

                $(document).on('click', '.remove-user', function() {
                    $(this).closest('p').remove();
                });


            $(document).off('click', '#add_book_id').on('click', '#add_book_id', function() {
                const selectedBookId = $("#book_titles").val();
                const selectedBookTitle = $("#book_titles option:selected").text();
                
                if (selectedBookId && selectedBookId !== "") {
                        const bookHtml = `
                            <p class="book-line" data-bookid="${selectedBookId}">
                                <span class="remove-book" data-bookid="${selectedBookId}">&#9747;</span>
                                ${selectedBookTitle} (${selectedBookId})
                            </p>
                        `;
                        $('.books_section').append(bookHtml);
                } else {
                    alert("Please select a book first");
                }
            });

            $(document).on('click', '.remove-book', function() {
                $(this).closest('.book-line').remove();
            });          

                $('#specific_order').html(`
                    <h3 class="specific_order_title">Edit Order</h3>
                    <form id="form_id" action="#" method="PUT">
                        <strong>Order ID:</strong>
                        <p>${data._id}</p>
                        
                        <div class="user_id_section">
                            <strong>User ID:</strong>
                        </div>
                        
                        <div class="user_selection_section">
                            <div class="user_form_group">
                                <button type="button" id="add_user_id">+</button>
                                <select name="usernames" id="usernames" class="user_control">
                                    <option value="">-- Select a username --</option>
                                    <!-- User options will be populated here -->
                                </select>
                            </div>
                        </div>
                        
                        <div class="books_section">
                            <strong>Books:</strong>
                            ${booksHtml}
                        </div>
                        
                        <div class="book_selection_section">
                            <div class="book_form_group">
                                <button type="button" id="add_book_id">+</button>
                                <select name="book_titles" id="book_titles" class="book_control">
                                    <option value="">-- Select a book title --</option>
                                    <!-- Book options will be populated here -->
                                </select>
                            </div>
                        </div>
                        
                        <p><strong>Order Date: </strong>${new Date(data.orderDate).toLocaleDateString()}</p>
                        <p><strong>Status: </strong>${data.status}</p>
                        <p><strong>Total Amount: </strong>$${data.totalAmount.toFixed(2)}</p>
                        
                        <div class="specific_order_button_container">
                            <button type="button" id="api-update">Confirm</button>
                            <button type="button" id="cancel_specific_order">Cancel</button>
                        </div>
                    </form>
                `);

                $("#cancel_specific_order").click(function() {
                    $(".specific_order").css("display", "none");
                });

                function removeUserIdLine(userId) {
                    $('.user_id_section p').html('');
                    return false;
                }

                $(".remove-user").click(function() {
                    const userId = $(this).data('userid');
                    removeUserIdLine(userId);
                });

                function removeBookIdLine(bookId) {
                    $(`.book-line[data-bookid="${bookId}"]`).remove();
                    return false;
                }

                $(".remove-book").click(function() {
                    const bookId = $(this).data('bookid');
                    removeBookIdLine(bookId);
                });

                $('#api-update').click(function() {

                    const userId = $('.user_id_section').find('[data-userid]').data('userid');
                    if (!userId) {
                        alert("Please select a user");
                        return;
                    }
                    
                    const bookIds = $('.book-line').map(function() {
                        return $(this).data('bookid');
                    }).get();
                    
                    if (bookIds.length === 0) {
                        alert("Please add at least one book");
                        return;
                    }
                    
                    const updateData = {
                        userId: userId,
                        bookIds: bookIds
                    };
                    
                    $.ajax({
                        url: `${orderUrl}${orderId}`,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(updateData),
                        success: function(response) {
                            console.log("Update successful:", response);
                            $(".specific_order").hide();
                            fetchOrders();
                        },
                        error: function(xhr, status, error) {
                            console.error("Update failed:", status, error);
                            console.error("Response:", xhr.responseText);
                            alert(`Error updating order: ${xhr.status} ${xhr.statusText}\n${xhr.responseText}`);
                        }
                    });
                });

            })
            .fail(function(error) {
                console.error('Error:', error);
            });
    }

    $(document).on('click', '#edit', function() {
        const orderId = $(this).data('order-id');
        editSpecificOrder(orderId);
        $('#specific_order').css("display", "block");
    });


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
    
    $(document).on('click', '.delete', function() {
        const orderId = $(this).data('order-id');
        deleteOrder(orderId);
    });

    fetchOrders();
    fetchBooks();

    // Create order functions - include open up form and then api call

    $(document).on('click', '#open_create_order_form', function () {
        $(".create_order").css("display", "block");
    });

    $(document).on('click', '#cancel_create_order', function () {
        $(".create_order").css("display", "none");
    });



});