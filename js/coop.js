/* Submit an order. */
var orderClick = function(item, base_price) {

  // Get the checkboxes. 
  var list = $('.table-view-cell input:checkbox');
  var options = [];
  var price = +parseFloat(base_price);
  var message = "";

  // Save the options and prices of the checked boxes.
  for (var i = 0; i < list.length; i++) {
    if ($(list[i]).prop('checked')) {
      options.push($(list[i]).val());
      price += parseFloat($(list[i]).data().price);
    }
  }

  // Build up our email message.
  message += "Your order is a " + item + ((options.length > 0) ? " with " : "");

  // Add options to message.
  for (var i = 0; i < options.length; i++) {
    // Add commas if multiple options.
    if (i < options.length - 1) {
      message += options[i] + ", ";
    } else {
      message += options[i];
    }

  }
  message += ". Your total price is $" + price.toFixed(2) + ".";

  console.log(message);

  // Send the order e-mail.
  //sendMail(message);
}

/* Send an e-mail with the order information. */
function sendMail(message) {
  var link = "mailto:me@example.com?" + "&subject=" + encodeURIComponent("Coop Fountain Order") + "&body=" + encodeURIComponent(message);;

  window.location.href = link;
}