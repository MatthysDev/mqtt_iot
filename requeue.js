// requeue.js
const mongoose = require('mongoose');
const Message = require('./models/message');

mongoose.connect('mongodb://localhost:27017/mqtt_queue');

async function requeueMessages() {
    while (true) {
        const currentTime = new Date();
        const timeout = 30000; // 30 secondes
        const expiredMessages = await Message.find({ status: 'in-progress', timestamp: { $lt: new Date(currentTime - timeout) } });

        for (const message of expiredMessages) {
            await Message.findByIdAndUpdate(message._id, { status: 'pending', $inc: { attempts: 1 } });
            console.log(`Message ${message._id} requeued.`);
        }

        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}

requeueMessages();
