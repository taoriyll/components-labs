const EventEmitter = require('events');

class MessageHub extends EventEmitter {}
const hub = new MessageHub();

function asyncConsumer(name) {
    hub.on('message', async (message) => {
        try {
            console.log(`[${name}]: Received message - "${message}"`);
            if (message === 'Throw Error') {
                throw new Error(`Simulated error in ${name}!`);
            }
            await processMessage(name, message);
        } catch (err) {
            hub.emit('error', err);
        }
    });
}

async function processMessage(name, message) {
    console.log(`[${name}]: Processing message...`);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[${name}]: Finished processing message - "${message}"`);
            resolve();
        }, 1000);
    });
}

function producer(message) {
    console.log(`[Producer]: Sending message - "${message}"`);
    hub.emit('message', message);
}

hub.on('error', (err) => {
    console.error(`[Error]: ${err.message}`);
    hub.removeAllListeners('message');
});

asyncConsumer('Consumer A');
asyncConsumer('Consumer B');

producer('Update №1');
producer('Update №2');
producer('Throw Error');
