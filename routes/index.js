const router = require('express').Router()
const { saveImage, getImage } = require('../controllers/image.controller');
const createFilesDir = require('../middlewares/createFilesDir');

router.get('/', createFilesDir, getImage)
router.post('/', createFilesDir, saveImage)

module.exports = router;
