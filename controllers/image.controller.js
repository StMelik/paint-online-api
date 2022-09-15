const fs = require('fs')
const path = require('path')

const saveImage = (req, res) => {
    try {
        const { img, name } = req.body
        const data = img.replace('data:image/png;base64,', '')

        fs.writeFileSync(path.join(req.filesDirPath, name), data, 'base64')
        return res.send({ message: "Ok" })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error!" })
    }
}

const getImage = (req, res) => {
    try {
        const name = `${req.query.id}.jpg`

        const file = fs.readFileSync(path.join(req.filesDirPath, name))
        const data = 'data:image/png;base64,' + file.toString('base64')
        res.json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error!" })
    }
}

module.exports = {
    saveImage,
    getImage
}
