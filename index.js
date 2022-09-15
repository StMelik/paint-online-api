const express = require('express')
const app = express()
const WSexpress = require('express-ws')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Сервер запустился на ${PORT} порту.`);
})