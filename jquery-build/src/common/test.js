$('#specific_order').off('submit', 'form').on('submit', 'form', function(e) {
    e.preventDefault();
    
    // Get user ID
    const userId = $('.user_id_section').find('[data-userid]').data('userid');
    if (!userId) {
        alert("Please select a user");
        return;
    }
    
    // Get book IDs
    const bookIds = $('.book-line').map(function() {
        return $(this).data('bookid');
    }).get();
    
    if (bookIds.length === 0) {
        alert("Please add at least one book");
        return;
    }
    
    // Prepare data
    const updateData = {
        userId: userId,
        bookIds: bookIds
    };
    
    console.log("Updating order:", orderId, "with data:", updateData);
    
    // Make API call
    $.ajax({
        url: `${orderUrl}${orderId}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updateData),
        success: function(response) {
            console.log("Update successful:", response);
            alert("Order updated successfully!");
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