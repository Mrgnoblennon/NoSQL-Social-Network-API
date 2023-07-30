const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usersController');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
// Which user you want to add a friend too
router.post('/:userId/friends/:friendId', userController.addFriend);
// Which user you want too remove as a friend 
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;
