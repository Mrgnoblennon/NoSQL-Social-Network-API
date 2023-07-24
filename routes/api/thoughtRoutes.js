const express = require('express');
const router = express.Router();
//const ThoughtController = require('../../controllers/thoughtController');

router.get('/');
router.get('/:thoughtId');
router.post('/');
router.put('/:thoughtId');
router.delete('/:thoughtId');
router.post('/:thoughtId/reactions');
router.delete('/:thoughtId/reactions/:reactionId');

module.exports = router;
