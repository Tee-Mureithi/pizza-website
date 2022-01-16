// Business Logic
var price, crust_price, topping_price;
let total = 0;

function Getpizza(name, size, crust, topping, total) {
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
    this.total = total;
}
// User interface logic

// proceed button
$(document).ready(function() {
    $("button.addPizza").hide();
    $("button.proceed").click(function(event) {
        $("button.addPizza").show();
        $("button.cancel").hide();
        let pname = $(".name option:selected").val();
        let psize = $("#size option:selected").val();
        let pcrust = $("#crust option:selected").val();
        let ptopping = [];
        $.each($("input[name='toppings']:checked"), function() {
            ptopping.push($(this).val());
        });
        console.log(ptopping.join(", "));

        switch (psize) {
            case "0":
                price = 0;
                break;
            case "large":
                price = 800;
                console.log(price);
                break;
            case "medium":
                price = 600;
                console.log("The price is " + price);
                break;
            case "small":
                price = 400;
                console.log(price);
            default:
                console.log("error");
        }
        switch (pcrust) {
            case "0":
                crust_price = 0;
                break;
            case "Crispy":
                crust_price = 120;
                break;
            case "Stuffed":
                crust_price = 80;
                break;
            case "Gluten-free":
                crust_price = 140;
                break;
            default:
                console.log("No price");
        }
        // var topping_value = ptopping.length * 0;
        if (psize == "large") {
            var topping_value = ptopping.length * 100;
        } else if (psize == "medium") {
            var topping_value = ptopping.length * 80;
        } else {
            var topping_value = ptopping.length * 50;
        }
        console.log("toppins value" + topping_value);

        if ((psize == "0") && (pcrust == "0")) {
            console.log("nothing selected");
            $("button.proceed").show();
            $("#information").show();
            $("div.choise").hide();
            alert("Please select pizza size and crust");
        } else {
            $("button.proceed").hide();
            $("#information").hide();
            $("div.choise").slideDown(1000);
        }

        total = price + crust_price + topping_value;
        console.log(total);
        let checkoutTotal = 0;
        checkoutTotal = checkoutTotal + total;

        $("#pizzaname").html($(".name option:selected").val(""));
        $("#pizzasize").html($("#size option:selected").val(""));
        $("#pizzacrust").html($("#crust option:selected").val(""));
        $("#pizzatopping").html(ptopping.join(", "));
        $("#totals").html(total);

        // Add pizza button
        $("button.addPizza").click(function(event) {
            event.preventDefault()
            let pname = $(".name option:selected").val();
            let psize = $("#size option:selected").val();
            let pcrust = $("#crust option:selected").val();
            let ptopping = [];
            $.each($("input[name='toppings']:checked"), function() {
                ptopping.push($(this).val());
            });
            console.log(ptopping.join(", "));
            switch (psize) {
                case "0":
                    price = 0;
                    break;
                case "large":
                    price = 800;
                    console.log(price);
                    break;
                case "medium":
                    price = 600;
                    console.log("The price is " + price);
                    break;
                case "small":
                    price = 400;
                    console.log(price);
                default:
                    console.log("error");
            }
            switch (pcrust) {
                case "0":
                    crust_price = 0;
                    break;
                case "Crispy":
                    crust_price = 120;
                    break;
                case "Stuffed":
                    crust_price = 80;
                    break;
                case "Gluten-free":
                    crust_price = 140;
                    break;
                default:
                    console.log("No price");
            }

            if (psize == "large") {
                var topping_value = ptopping.length * 100;
            } else if (psize == "medium") {
                var topping_value = ptopping.length * 80;
            } else {
                var topping_value = ptopping.length * 50;
            }

            console.log("toppins value" + topping_value);
            total = price + crust_price + topping_value;
            console.log(total);

            checkoutTotal = checkoutTotal + total;
            console.log(checkoutTotal);
            // constractor function
            var newOrder = new Getpizza(pname, psize, pcrust, ptopping, total);

            $("#ordersmade").append('<tr><td id="pizzaname">' + newOrder.name + '</td><td id="pizzasize">' + newOrder.size + '</td><td id="pizzacrust">' + newOrder.crust + '</td><td id="pizzatopping">' + newOrder.topping + '</td><td id="totals">' + newOrder.total + '</td></tr>');
            console.log(newOrder);



        });
        // Checkout button
        $("button#checkout").click(function() {
            $("button#checkout").hide();
            $("button.addPizza").hide();
            $("button.cancel").slideDown(1000);
            $("button.deliver").slideDown(1000);
            $("#addedprice").slideDown(1000);
            console.log("Your total bill equals to Ksh. " + checkoutTotal + "/-");
            $("#pizzatotal").append("Your bill is Ksh. " + checkoutTotal + "/-");
            // $("#ordersmade").text("");
        });
        // cancel button

        $("button.cancel").click(function() {
            $("button#checkout").hide();
            $("button.addPizza").hide();
            $("button.cancel").hide();
            $("button.deliver").hide();
            $("h2#summary").hide();
            $("#pizzatotal").text("You've Successfully cancel the order. Nothing in the cart.");
            $("#addedprice").text("");
            $("#ordersmade").text("");


        });

        // home delivery button
        $("button.deliver").click(function() {
            $(".pizzatable").hide();
            $(".choise h2").hide();
            $(".delivery").slideDown(1000);
            $("#addedprice").hide();
            $("button.deliver").hide();
            $("button.cancel").hide();
            $("#pizzatotal").hide();
            let deliceryamount = checkoutTotal + 300;
            console.log("You will pay sh. " + deliceryamount + " on delivery");
            $("#totalbill").append("The total amount to be paid is: " + deliceryamount + "/-");
        });

        // On clicking place order button
        $("button#final-order").click(function(event) {
            event.preventDefault();

            $("#pizzatotal").hide();
            $(".delivery").hide();
            $("button#final-order").hide();
            let deliceryamount = checkoutTotal + 300;
            console.log("Final Bill is: " + deliceryamount);
            let person = $("input#name").val();
            let phone = $("input#phone").val();
            let location = $("input#location").val();

            // Getting date and time
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            var time = (today.getHours() + 1) + ":" + (today.getMinutes());
            var dateTime = date + ' ' + time;

            if ($("input#name").val() && $("input#phone").val() && $("input#location").val() != "") {

                $("#finallmessage").append("Congratulations " + person + "! your order has been received and it will be delivered to you at " + location + " before " + time + " " + " " +
                    date + ". <br> Total amount to be paid is Ksh." +
                    deliceryamount + " / -");
                $("#totalbill").hide();
                $("#finallmessage").slideDown(1200);
            } else {
                alert("Please provide your details here to enable us reach you");
                $(".delivery").show();
                $("button#final-order").show();
            }
        });
        event.preventDefault();
    });
});