const router = require('express').Router();
const postRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/', postRoutes);
router.use('/users', userRoutes);

module.exports = router;