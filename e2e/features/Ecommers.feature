Feature:Ecommerce Validation
Scenario Outline: Placeing the order from application
Given User login to Ecommerce application with "satyatheone@gmail.com" and "S@ty@1qq5".
When user add the item "ZARA COAT 3" to cart.
Then Varify "ZARA COAT 3" will be displayed in the cart.
When Enter valid details and place the order.
Then Varify order is present in OrderHistory.