const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)

const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    console.log("ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО");

    ws.send("Ты успешно подключен")

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }

        console.log('MESSAGE:', msg);
    })

})

app.listen(PORT, () => {
    console.log(`Сервер запустился на ${PORT} порту.`);
})

function connectionHandler(ws, msg) {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

function broadcastConnection(ws, msg) {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}
