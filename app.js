const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const { json } = require("stream/consumers");

const app = express();
const PORT = process.env.PORT;


const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

//routes
// const botRoute = require("./routes/bot") 

const fastFood = {
  2:'Item1',
  3:'Item2',
  4:'Item3',
  5:'Item4',
};

const orderHistory = [];

app.use(express.json())
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: true,
  saveUninitialized: true
});
// app.set('view engine', 'ejs')
// app.use('/bot', botRoute)

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionMiddleware);

const io = require("socket.io")(server);

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  const state = {
    name: "",
    currentOrder: [],
  }
  
  const botMessage = async (response) => {
    const message = {
      name: "chatbot",
      input: response,
      dateTime: new Date().toLocaleString()
    };
    console.log("Bot message sent: ", message)
    socket.emit("bot-message", message)
  };

  const userMessage = async (message) => {
    console.log("User message recieved: ", message)
    try {
      if(!state.name){
        state.name = message.name;
        await botMessage(`Welcome ${state.name}!\n1. Place an order\n99. Check out order\n98. See Order History\n97. See current Order\n0. Cancel order`
        );
      }else{
        switch(message.input){
          case "1":
            const itemOptions = object.keys(fastFood)
            .map((key) => `${key}. ${fastFood[key]}`)
            .join("\n");
            await botMessage(
              `Please select an item:\n${itemOptions}`
            );
            break;
          case "2":
          case "3":
          case "4":
          case "5":
            const inputedIndex = parseInt(message.input);
            if(fastFoods.hasOwnProperty(inputedIndex)){
              const selectedItem = fastFoods[inputedIndex];
              state.currentOrder.push(selectedItem);
              await botMessage(
                `${selectedItem} has been added to your order. Do you want to add more items to your order? Type numbers. If not, type 99 to checkout.`
              );
            }else{
              await botMessage(
                `Please select an item from the list.`
              );
            }
            break;
          case "99":
            if(state.currentOrder.length === 0){
              await botMessage(
                `Your order is empty. Please add items to your order.`
              );
            }else{
              orderHistory.push(state.currentOrder);
              await botMessage(
                `Your order has been placed.`
              );
              state.currentOrder = [];
            }
            break;
          case "98":
            if(orderHistory.length === 0){
              await botMessage(
                `You have no previous orders.`
              );
            }else{
              const orderHistoryString = orderHistory
              .map((order, index) => `${index + 1}. ${order.join(", ")}`)
              .join("\n");
              await botMessage(
                `Your order history:\n${orderHistoryString}`
              );
            }
            break;
          case "97":
            if(state.currentOrder.length === 0){
              await botMessage(
                `Your order is empty. Please add items to your order.`
              );
            }else{
              const currentOrderString = state.currentOrder.join(", ");
              await botMessage(`Your current order:\n${currentOrderString}`);
            }
            break;
          case "0":
            if(state.currentOrder.length === 0){
              await botMessage("No order to cancel.");
            }else{
              state.currentOrder = [];
              await botMessage("Order cancelled.");
            }
            break;
          default:
            await botMessage("Invalid input. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      await botMessage("Something went wrong. Please try again.");
    }
  }

  socket.on("user-message", userMessage);
});



// socket.on("message", (data) => {

//   data.name = "chatbot"
//   data.dateTime = new Date().toLocaleString()

//   if(data.message === "0"){
//     data.message = "Order Cancelled"
//   }
//   socket.emit('chat-message', data)
// });
