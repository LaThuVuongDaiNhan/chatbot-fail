document.addEventListener("DOMContentLoaded", function () {
    const chatHistory = document.getElementById("chat-history");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    function addUserMessage(message) {
        const newMessage = document.createElement("p");
        newMessage.textContent = "User: " + message;
        chatHistory.appendChild(newMessage);
    }

    function addChatGptResponse(message) {
        const newMessage = document.createElement("p");
        newMessage.textContent = "ChatGPT: " + message;
        chatHistory.appendChild(newMessage);
    }

    // Function to handle user input and chatbot response
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message !== "") {
            addUserMessage(message);
            userInput.value = "";

            // Call the function to send the user message to ChatGPT API
            sendMessageToChatGPT(message);
        }
    }

    function sendMessageToChatGPT(message) {
        const apiKey = 'sk-nghĩ gì có apikey '; // Replace with your actual API key
        const endpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

        // Create an array of message objects
        const messages = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message },
        ];

        // Create the request payload
        const payload = {
            model: 'gpt-3.5-turbo',
            messages: messages,
        };

        // Make the API call
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the API response here
            console.log('API Response:', data);

            // You can display the chatbot's response to the user
            const chatGptResponse = data.choices[0].message.content;
            addChatGptResponse(chatGptResponse); // Add the response to your chat UI
        })
        .catch(error => {
            console.error('API Error:', error);
        });
    }

    sendButton.addEventListener("click", handleUserInput);

    // Listen for "Enter" key press in the input field
    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    // Simulate a ChatGPT welcome message
    setTimeout(function () {
        const welcomeMessage = "Welcome to the ChatGPT chat page!";
        addChatGptResponse(welcomeMessage);
    }, 500);
});
