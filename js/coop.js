function orderClick(base_price) {
    
//    alert("hello");

    var list = $('.table-view-cell input:checkbox');
    var options = [];
    var price = parseFloat(base_price);
    console.log(list.length);
    for (var i = 0; i < list.length; i++) {
       if ($(list[i]).prop('checked')) {
            options.push($(list[i]).val());
            price += parseFloat($(list[i]).data().price);
       }
    }
    console.log(price);
    console.log(options);

//	 Toggle sub-menu items.
	 // alert($('input[name="bagel"]:checked').length)
     

	
}

function sendMail() {
    var link = "mailto:me@example.com"
             + "?cc=myCCaddress@example.com"
             + "&subject=" + escape("This is my subject")
             + "&body=";
    ;

    window.location.href = link;
}