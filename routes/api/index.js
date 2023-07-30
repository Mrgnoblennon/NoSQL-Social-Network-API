const router = require('express').Router();
const postRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', postRoutes)

module.exports = router;