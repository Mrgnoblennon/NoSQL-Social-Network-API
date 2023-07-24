const express = require('express');
const router = express.Router();
//const UserController = require('../controllers/userController');

router.get('/');
router.get('/:userId');
router.post('/');
router.put('/:userId');
router.delete('/:userId');
router.post('/:userId/friends/:friendId');
router.delete('/:userId/friends/:friendId');

module.exports = router;
