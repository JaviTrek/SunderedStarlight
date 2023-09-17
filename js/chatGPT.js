import axios from "axios";
import bestFriends from "./gameComponents/bestFriends.js";

let chatStrings = {
    anger: "",
    depress: "",
    denial: "",
    acceptance: "",
    guilt: ""
};

const container = document.getElementById("textContainer");

export function showContainer() {
    container.style.display = "flex";
}

export function hideContainer() {
    container.style.display = "none";
}


document.addEventListener("DOMContentLoaded", () => {

    const userInput = document.getElementById("userInput");
    const receivedData = document.getElementById("receivedData");
    const sendDataBtn = document.getElementById("sendData");

    sendDataBtn.addEventListener("click", async () => {
        try {
            const currentNPC = JSON.parse(localStorage.getItem('lastHitNPC'));  // Get the current NPC

            // Update chat string for the current NPC
            chatStrings[currentNPC.name] += `This is the personality of your character: ${currentNPC.personality}. This is the next message from the user: ${userInput.value}`;

            // Replace the URL with your API endpoint
            const response = await axios.post("http://localhost:4000/chatGPT", {
                data: chatStrings[currentNPC.name]
            });

            // Append NPC's reply to chat string for the current NPC
            chatStrings[currentNPC.name] += `Here is the reply you made as a character to the previous message: ${response.data.content}`;

            // Assume the response data contains a field named 'content'
            receivedData.value = response.data.content;

            // Show the container after successful POST request
            showContainer();

        } catch (error) {
            console.error("An error occurred:", error);
            receivedData.value = "An error occurred.";

            // Optionally, show the container to display the error
            showContainer();
        }
    });
});
