const socket = io()

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    sendMessage()
})

function sendMessage(){
    if(messageInput.value === '') return
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date().toLocaleDateString()
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', data => {
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data){
    const element = `
    <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
        <p class="message">
            ${data.message}
            <span>${data.name} ${data.dateTime}</span>
        </p>
    </li>
    `
    messageContainer.innerHTML += element
    scrollToBottom()
}


function scrollToBottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}