$(function() {

  // Tray object.
  var tray = {
    orders: []
  };

  // Check if the tray has been saved in storage before.
  if (!localStorage.getItem("tray")) {
    localStorage.setItem("tray", JSON.stringify(tray));
  }

  // Add an item to the tray.
  var addItem = function(name, extras, price) {
    var item = {
      name: name,
      extrasList: extras,
      price: price
    };
    tray = JSON.parse(localStorage.getItem("tray"));
    tray.orders.push(item);
    localStorage.setItem("tray", JSON.stringify(tray));
    console.log(localStorage.getItem("tray"));
  }


  // Display items in the tray
  var displayTray = function() {

    // Empty the tray list before displaying the tray.
    $("#tray").empty();

    // Get the orders from storage.
    var orders = JSON.parse(localStorage.getItem("tray")).orders;

    // Iterate through orders and add them to the tray.
    for (i = 0; i < orders.length; i++) {

      // Build up the list item for each order.
      var item = orders[i];
      var li = $("<li>").addClass("table-view-cell").addClass("media");
      var span = $("<span>").addClass("badge").append(item.price);

      // Remove the item on click.
      li.click(function() {
        removeItem(i);
      });

      // Add the item to the tray.
      var div = $("<div>").addClass("media-body").append(item.name);
      var p = makeExtraP(item.extrasList);
      div.append(p);
      li.append(span);
      li.append(div);
      $("#tray").append(li);
    }

  }

  // Make a paragraph object from a list of strings.
  var makeExtraP = function(extraList) {
    var extraStr = "";
    for (var i = 0; i < extraList.length; i++) {
      if (i === extraList.length - 1) {
        extraStr = extraStr + extraList[i];
      } else {
        extraStr = extraStr + extraList[i] + ", ";
      }
    }
    return $("<p>").text(extraStr);
  }

  // Remove an item from the tray.
  var removeItem = function(index) {
    tray = JSON.parse(localStorage.getItem("tray"));

    // Delete 1 item beginning at index-1.
    tray.orders.splice(index - 1, 1);
    localStorage.setItem("tray", JSON.stringify(tray));

    // Refresh tray.
    displayTray();
  }


  // Objects for the menu categories and the relevant links.
  var menu_categories = ["Bagels, Muffins, Pastries", "Coop Meals", "Drinks", "From The Fryer",
    "Mexican", "Rice Bowls", "Salads", "Sandwiches"
  ];
  var menu_links = ["bagels-muffins-pastries.html", "#", "#", "#", "#", "#", "#", "#"];

  var buildMenu = function() {
    // Build up the menu.
    for (var i = 0; i < menu_categories.length; i++) {
      var li = $("<li>").addClass("table-view-cell");
      var a = $("<a>").addClass("navigate-right").attr("href", menu_links[i]);
      a.append(menu_categories[i]);
      li.append(a);
      $("#menu_categories").append(li);
    }
  }




  // Bagel options and their prices.
  var bagel_extras = {
    extra_names: ["cream cheese", "lox", "veggies", "bacon"],
    extra_prices: ["0.85", "3.00", "0.75", "0.99"]
  }

  // Fill the option pages.
  var fillOptionsPage = function(itemName, extrasObject) {
    var extra_names = bagel_extras.extra_names;
    var extra_prices = bagel_extras.extra_prices;
    for (var j = 0; j < extra_names.length; j++) {
      var newli = $("<li>").addClass("table-view-cell");
      // li.append(j);
      var input = $("<input>").attr("type", "checkbox");
      input.attr("name", itemName).attr("value", extra_names[j]);
      var span = $("<span>").addClass("badge").append("$" + extra_prices[j]);
      newli.append(input);
      newli.append("Add " + extra_names[j]);
      newli.append(span);
      $("#extras").append(newli);
    }
    $("#extras").prop("data-item", itemName);
  }


  // Add the order to tray on click.
  $('.add').click(function() {
    var price = $("#bagel-extra").attr("data-base");
    orderClick('bagel', price);
  });


  // If the tray id is available, fill it with the tray.
  if ($("#tray")) {
    displayTray();
  }

  // If the extras id is available, fill it with options.
  if ($("#extras")) {
    fillOptionsPage('bagel', bagel_extras);
  }

  if ($("#menu_categories")) {
    buildMenu();
  }

  // Secondary menu options.
  var bagels_muffins_pasteries_options = ["Bagel", "Blueberry Scone", "Cinnamon Roll", "Danish", "Muffin"];
  var bagels_muffins_pasteries_prices = ["1.40", "2.50", "2.00", "1.99", "1.99"];
  var bagels_muffins_pasteries_extras = ["extras.html", "#", "#", "#", "#"]; //list of list of extras

  // Fill the secondary menu options.
  for (var i = 0; i < bagels_muffins_pasteries_options.length; i++) {
    var option_name = bagels_muffins_pasteries_options[i]
    var li = $("<li>").addClass("table-view-cell");
    var a = $("<a>").attr("href", bagels_muffins_pasteries_extras[i]);
    var span = $("<span>").addClass("badge").append(bagels_muffins_pasteries_prices[i]);
    a.append(option_name);
    a.append(span);
    li.append(a);
    $("#bagels-muffins-pasteries").append(li);
  }

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

    price = price.toFixed(2);

    // Add to tray.
    addItem(item, options, price);

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
    message += ". Your total price is $" + price + ".";
  }

  /* Send an e-mail with the order information. */
  var sendMail = function(message) {
    var link = "mailto:me@example.com?" + "&subject=" + encodeURIComponent("Coop Fountain Order") + "&body=" + encodeURIComponent(message);;

    window.location.href = link;
  }
});