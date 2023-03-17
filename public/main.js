const socket = io()

const nameInput = prompt("Enter your name: ");

document.querySelector('a').innerText = nameInput
// document.getElementById('message').innerHTML = `
//         Welcome to my restaurant ${nameInput}
        
//         <li>Select 1 to Place an order</li>
//         <li>Select 99 to checkout order</li>
//         <li>Select 98 to see order history</li>
//         <li>Select 97 to see current order</li>
//         <li>Select 0 to cancel order</li>
//         <span> chatbot ${new Date().toLocaleString()}</span>
// `
const messageContainer = document.getElementById('message-container') 
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')



messageForm.addEventListener('submit', e => {
    e.preventDefault()
    sendMessage()
})

function sendMessage(){
    if(messageInput.value === '') return
    const message = {
        name: nameInput,
        input: messageInput.value,
        dateTime: new Date().toLocaleDateString()
    }
    addMessageToUI(true, message)
    socket.emit('user-message', message)
    messageInput.value = ''
}

socket.on('bot-message', (message) => {
    addMessageToUI(false, message)
})

function addMessageToUI(isOwnMessage, message){
    const element = `
    <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
        <p class="message">
            ${message.input}
            <span>${message.name} ${message.dateTime}</span>
        </p>
    </li>
    `
    messageContainer.innerHTML += element
    scrollToBottom()
}


function scrollToBottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}