const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const WSServer = require('express-ws')(app)

const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

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

app.post("/image", (req, res) => {
    try {
        const data = req.body.img.replace('data:image/png;base64,', '')
        const name = req.body.name

        fs.writeFileSync(path.resolve(__dirname, 'files', name), data, 'base64')

        return res.send({ message: "Загружено" })

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error!" })
    }
})

app.get("/image", (req, res) => {
    const name = `${req.query.id}.jpg`

    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', name))
        const data = 'data:image/png;base64,' + file.toString('base64')
        res.json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error!" })
    }
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
