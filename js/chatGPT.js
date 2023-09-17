import axios from "axios"

let chatString;

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



    // Initially hide the container
    //hideContainer();

    sendDataBtn.addEventListener("click", async () => {
        try {

            chatString += `This is the next message from the user: ${userInput.value}`;
            // Replace the URL with your API endpoint
            const response = await axios.post("http://localhost:4000/chatGPT", {
                data: chatString
            });
            chatString += `Here is the reply you made as a character to the previous message: ${response.data.content}`


            // Assume the response data contains a field named 'message'
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
