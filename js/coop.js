$(function() {
    //----TRAY PAGE -----
    //tray object
    var tray = []; //list of items
    
    addItem("bagel", ["cream cheese","lox"], 2);
    addItem("muffin", [], 3);
    displayTray();
    displayTray();
    
    //add item to list and to ul
    function addItem(name, extras, price){
        var item = {
            name: name,
            extrasList: extras,
            price: price
        };
        tray.push(item);
    }
    
    function displayTray(){
        $("#tray").empty();//empty ul before filling again
        for(i=0; i < tray.length; i++){
            var item = tray[i];
            var li = $("<li>").addClass("table-view-cell").addClass("media");
            var index = i;//element's index
            li.click(function(){
                removeItem(index);
            });//add function to remove li when clicked on
            var div = $("<div>").addClass("media-body").append(item.name);
            var p = makeExtraP(item.extrasList);
            div.append(p);
            li.append(div);
            $("#tray").append(li);
        }
        
    }
    
    //makes a paragraph object from a list of strings
    function makeExtraP(extraList){
        var extraStr = "";
        for(var i=0; i < extraList.length; i++){
            if(i === extraList.length - 1){
                extraStr =  extraStr + extraList[i];
            }else{
                extraStr =  extraStr + extraList[i] + ", ";
            }
        }
        return $("<p>").text(extraStr);
    }
    
    function removeItem(index){
        tray.splice(index-1,1);//delete 1 item beginning at index-1
        displayTray();//refresh tray
    }
    

    //-----FILL MENU CATEGORIES------
    var menu_categories = ["Bagels, Muffins, Pastries", "Coop Meals", "Drinks", "From The Fryer",
                          "Mexican", "Rice Bowls", "Salads", "Sandwiches"];
    var menu_links = ["bagels-muffins-pastries.html","","","","","","",""];

    for(var i = 0; i < menu_categories.length; i++){
        var li = $("<li>").addClass("table-view-cell");
        var a = $("<a>").addClass("navigate-right").attr("href",menu_links[i]);
        a.append(menu_categories[i]);
        li.append(a);
        $("#menu_categories").append(li);
    }
    
    
    //----FILL EXTRAS PAGE-------
    var bagel_extras = {
        extra_names: ["cream cheese","lox","veggies","bacon"],
        extra_prices: ["0.85","3.00","0.75","0.99"]
    }
    
    function fillOptionsPage(itemName, extrasObject){
        
        var extra_names = bagel_extras.extra_names;
        var extra_prices = bagel_extras.extra_prices;
        for(var j=0; j < extra_names.length; j++){
            var newli = $("<li>").addClass("table-view-cell");
            //li.append(j);
            //var input = $("<input>").attr("type","checkbox");
            //input.attr("name", itemName).attr("value",extra_names[j]);
            //var span = $("<span>").addClass("badge").append("$"+extra_prices[j]);
            //li.append(input);
            //li.append("Add "+extra_names[j]);
            //li.append(span);
            //$("#extras").append(li);
            $("#extras").append("djghf");
            
            console.log($("#extras"));
        }
    }

//      <li class="table-view-cell">
//        <input type="checkbox" name="bagel" value="bacon" /> Add bacon
//         <span class="badge badge-inverted">$0.99</span>
//      </li>
    
    
    $('.submit').click(function() {
       addItem("", [], 2.50);//need to implement this 
    });
    
    //-----FILL ALL SECONDARY MENUS-----
    var bagels_muffins_pasteries_options = ["Bagel","Blueberry Scone", "Cinnamon Roll", "Danish", "Muffin"];
    var bagels_muffins_pasteries_prices = ["1.40","2.50","2.00","1.99","1.99"];
    var bagels_muffins_pasteries_extras = [bagel_extras,{},{},{},{}];//list of list of extras
    
    for(var i = 0; i < bagels_muffins_pasteries_options.length; i++){
        var option_name = bagels_muffins_pasteries_options[i];
        
        var li = $("<li>").addClass("table-view-cell");
        li.click(function(){
            fillOptionsPage(bagel_extras, "Bagel");
        });
        var a = $("<a>").attr("href", "extras.html");
        var span = $("<span>").addClass("badge").append(bagels_muffins_pasteries_prices[i]);
       
        a.append(option_name);
        a.append(span);
        li.append(a);
        $("#bagels-muffins-pasteries").append(li);
    }
});