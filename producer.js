// producer.js
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

// fonction pour publier un message sur un topic
function publishMessage(topic, message) {
    console.log("🚀 ~ publishMessage ~ message:", message)
    console.log("-----------")
    client.publish(topic, message);
}

// fonction pour s'abonner à un topic
function subscribeToTopic(topic) {
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to ${topic}`);
        } else {
            console.error(`Failed to subscribe to ${topic}:`, err);
        }
    });
}

// connexion au broker MQTT
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    subscribeToTopic('topic/1');
    // publier un message sur les topics 'topic/1' et 'topic/2' toutes les 5 secondes
    setInterval(() => {
        publishMessage('topic/1', 'Message for topic 1');
        publishMessage('topic/2', 'Message for topic 2');
    }, 5000);
});
