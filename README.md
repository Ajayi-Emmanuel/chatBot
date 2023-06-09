# My Restaurant ChatBot

### A restaurant chatbot application built using socket.io, node, express

## URL
1. Online: https://restaurant-chatbot-8mz1.onrender.com

### Note

___The site requests the user's name first before rendering the page.___


___When the page has been rendered, the user has to type something for the bot to begin responding___

## Features
1. When a customer lands on the chatbot page, the bot should send these options to the customer: 
    - Select 1 to Place an order 
    - Select 99 to checkout order 
    - Select 98 to see order history 
    - Select 97 to see current order 
    - Select 0 to cancel order

2. When a customer selects “1”, the bot should return a list of items from the restaurant. The order items can have multiple options but the customer should be able to select the preferred items from the list using this same number select system and place an order.

3. When a customer selects “99” for an order, the bot should respond with “order placed” and if none the bot should respond with “No order to place”. Customer should also see an option to place a new order

4. When a customer selects “98”, the bot should be able to return all placed orders from previous order to present orders and return no current orderif no order has been made yet

5. When a customer selects “97”, the bot should be able to return current selected items and return no current orderif none
6. When a customer selects “0”, the bot should cancel the order if there is.


## Setup
* Pull this repo
* In the CLI run npm install to install all node modules.
* create a .env file and type in the following in it
```
  PORT = //enter your desired port i.e 3000, 4000 etc
  SESSION_SECRET = //enter any string here i.e "akhdefwihgrwkgjwkjwkg"
```
* Run npm run start_dev on the CLI to start application
