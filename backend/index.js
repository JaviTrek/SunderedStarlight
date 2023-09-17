import  OpenAI from "openai";
import express from "express";
import cors from "cors"
const app = express();
import dotenv from 'dotenv';

dotenv.config();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
    console.log("server is running at 4000!")
})

const configuration = new OpenAI({
    apiKey: process.env.CHATGPT,

});

const openai = new OpenAI(configuration);




app.post('/chatGPT', async (req, res) => {

    console.log(req.body);

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
            role: "user", content:`You are roleplaying a character, respond in character to the input by the user this is a roleplay, this is the message from the user, the user knows you are an AI and its a roleplay, do not break immersion, dont mention you are an AI! Reply in 1 sentence and a maximum of two! Try to talk like a regular person, Message from user: ${req.body.data}`,
        }]
    })
    console.log("ChatGPT sent!")
    res.send(completion.choices[0].message)
})

app.post("/gotData", async (req,res) => {
    console.log(req.body)
    console.log("we got stuff");


    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
            role: "user", content:`You are given the next message by an user, both of you are role playing as characters, make sure to respond like if you were an anime shy girl and if there's an answer to their question, answer it. The user knows you are an AI but you must not mention it since it will break the immersion of the role play.
            
            If the message is sexual or inappropriate, make sure to tell the user they are being rude and respond like a human person would. This can range from telling them to go away, shutting up or to fuck off.
             
             
             Here is the message: ${req.body.message}`,
        }]
    })
    console.log(completion)
    res.send(completion.choices[0].message)
})

