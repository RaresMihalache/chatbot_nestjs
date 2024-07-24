async function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value;
  if (message.trim() === '') return;

  addMessageToChatbox(message, 'user');
  input.value = '';

  const response = await fetch('/chatbot/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  addMessageToChatbox(data.response, 'bot');
}

function addMessageToChatbox(message, sender) {
  const chatbox = document.getElementById('chatbox');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerText = message;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}
