// requeue.js
const mongoose = require('mongoose');
const Message = require('./models/message');
import dbUrl from './consumer.js';

// connexion à la base de données MongoDB
mongoose.connect(dbUrl);

// fonction pour requeuer les messages en attente depuis trop longtemps
async function requeueMessages() {
    while (true) {
        console.log('Checking for expired messages...');
        const currentTime = new Date();
        const timeout = 1000; // 30 secondes
        // récupérer les messages en cours depuis trop longtemps
        const expiredMessages = await Message.find({ status: 'in-progress', timestamp: { $lt: new Date(currentTime - timeout) } });

        // requeuer les messages
        for (const message of expiredMessages) {
            console.log(`Message ${message._id} requeued.`);
            await Message.findByIdAndUpdate(message._id, { status: 'pending', $inc: { attempts: 1 } });
        }
        // attendre 10 secondes avant de vérifier à nouveau
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}

requeueMessages();
