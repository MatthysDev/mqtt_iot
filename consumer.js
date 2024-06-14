// consumer.js
const { MongoClient } = require('mongodb');
const mqtt = require('mqtt');
const Message = require('./models/message');

export const dnUrl = 'mongodb+srv://MatthysDev:passwordtooweak@cluster0.gl8aj0c.mongodb.net/'

// fonction pour initialiser la connexion à la base de données MongoDB
async function initMongo() {
    const mongoClient = new MongoClient(dbUrl);
    await mongoClient.connect();
    db = mongoClient.db('message');
    console.log('Connected to MongoDB - message');
}

// initialisation de la connexion au broker MQTT
const client = mqtt.connect('mqtt://test.mosquitto.org');

// subscribe aux topics 'topic/1' et 'topic/2'
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(['topic/1', 'topic/2']);
});

// fonction pour traiter les messages reçus
client.on('message', async (topic, message) => {
    const msg = message.toString();
    console.log(`Received message on ${topic}: ${msg}`);

    const newMessage = new Message({ topic, message: msg });
    const collection = db.collection(topic);
    await collection.insertOne(newMessage);
    processMessage(newMessage);
});

// fonction pour traiter les messages
async function processMessage(message) {
    try {
        console.log(`Processing message: ${message.message}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await db.collection(message.topic).updateOne({ _id: message._id }, { $set: { status: 'completed' } });
        console.log(`Message ${message._id} processed and marked as completed.`);
    } catch (error) {
        console.error(`Error processing message ${message._id}:`, error);
    }
}

// initialisation de la connexion à MongoDB
initMongo();