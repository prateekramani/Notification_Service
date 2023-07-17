const express = require("express");
const { ServerConfig, Logger } = require("./config");
// this will direclty fetch index.js file
// reason behind creating so many folders (controller , router, config) is that , we can direclty import all the files in respective index file and import it here 
// so that there are less import lines 
const apiRoutes = require("./routes")
const amqplib = require("amqplib")
const { EmailService } = require("./services")

async function connectQueue() {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
    channel.consume("noti-queue" , async (data) => {
        console.log("Consumed data !!" , `${Buffer.from(data.content)}`);
        const object = JSON.parse(`${Buffer.from(data.content)}`);  
        await EmailService.sendEmail(ServerConfig.GMAIL_EMAIL, object.recipientMail , object.subject , object.content);
        channel.ack(data);
    })
}


const app = express();


app.use(express.json()) //this is going to add a middleware for all the upcoming routes 
app.use(express.urlencoded({ extended: true })) // to read url endoded stuff in req bodu

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, async () => {
    Logger.info("Successfully started the Notification service  server on PORT", {});
    // info is the level , Success....is the message 
    connectQueue();
    console.log(`Successfully started the Notification service server on PORT : ${ServerConfig.PORT}`)
})