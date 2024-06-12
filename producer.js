// producer.js
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

function publishMessage(topic, message) {
    console.log("🚀 ~ publishMessage ~ message:", message)
    console.log("-----------")
    client.publish(topic, message);
}

function subscribeToTopic(topic) {
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to ${topic}`);
        } else {
            console.error(`Failed to subscribe to ${topic}:`, err);
        }
    });
}

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    subscribeToTopic('topic/1');
    setInterval(() => {
        publishMessage('topic/1', 'Message for topic 1');
        publishMessage('topic/2', 'Message for topic 2');
    }, 5000);
});
