 const chatInput = document.querySelector("#chat-input");
 const sendButton = document.querySelector("#send-btn");
 const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY = "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";

const createElement = (html, className) => {
    // created new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className)
    chatDiv.innerHTML = html;
    return chatDiv;  // returning the created chat div
}

// chat response function

const getChatResponse = async () => {
    const API_URL = "https://api.openai.com/v1/completions";

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": userText,
            "max_tokens": 204,
            "temperature": 0.2,
            "n": 1,
            "stop": null
        })
    }

    try{
        const response = await (await fetch(API_URL, requestOptions)).json();
        console.log(response);
    } catch(error) {
        console.log(error);
    }

}


// function to show typing animation 
const showTypingAnimation = () => {
    const html = `<div class="chat-content">
                        <div class="chat-details">
                            <img src="./asset/chatbot.jpg" alt="chatbot-img">  
                            <div class="typing-animation">
                                <div class="typing-dot" style="--delay: 0.2s"></div>
                                <div class="typing-dot" style="--delay: 0.3s"></div>
                                <div class="typing-dot" style="--delay: 0.4s"></div>
                            </div>
                        </div>
                        <span class="material-symbols-rounded">content_copy</span>
                    </div>`;

        // create an incoming chat div with typing animation and append it to chat container 
    const outgoingChatDiv = createElement(html, "incomingChatDiv")
    chatContainer.appendChild(outgoingChatDiv)

    // code for getting chat response

    getChatResponse();
}


const handleOutgoingChat = () => {
    userText = chatInput.value.trim();
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="./asset/user.jpg" alt="user-img">  
                        <p>${userText}</p>
                    </div>
                </div>`;

        // create an outgoing chat div with user's message and append it to chat container 
    const outgoingChatDiv = createElement(html, "outgoing")
    chatContainer.appendChild(outgoingChatDiv)

    // showing animation for 3 dots after sending a message
    setTimeout(showTypingAnimation, 500)


}

 sendButton.addEventListener("click", handleOutgoingChat);