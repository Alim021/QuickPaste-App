const express = require('express');
const router = express.Router();
const controller = require('../controllers/pasteController');

router.get('/healthz', controller.health);
router.post('/pastes', controller.createPaste);
router.get('/pastes/:id', controller.getPaste);

module.exports = router;