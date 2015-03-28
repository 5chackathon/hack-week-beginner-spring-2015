$(function() {

	// Toggle sub-menu items.
	$(".table-view-cell").click(function() {
		$(this).next(".items").children("li").toggle();
	});
});