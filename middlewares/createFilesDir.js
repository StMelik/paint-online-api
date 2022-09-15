const fs = require('fs')
const path = require('path')

module.exports = (req, _, next) => {
    const filesDirPath = path.resolve(__dirname, '..', 'files')

    if (!fs.existsSync(filesDirPath)) {
        fs.mkdirSync(filesDirPath)
    }

    req.filesDirPath = filesDirPath
    next()
}
