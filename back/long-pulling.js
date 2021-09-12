const express = require('express');
const cors = require('cors');
const events = require('events');

const app = express();
const PORT = 5000;
const emitter = new events.EventEmitter();

app.use(cors());
app.use(express.json());

app.get('/get-messages', (req, res) => {
    //подписываемся на событие и ждем, когда другой участник отрпавил сообщения => всем отрпавляется ответ
    emitter.once("newMessage", (message) => {
        res.json(message);
    });
});

app.post('/set-message', (req, res) => {
    const message = req.body;
    emitter.emit("newMessage", message);
    res.status(200);
});

app.listen(PORT, () => console.log('server started'));