/* ------------------------------ */
/* Project  : Social Network API  */
/* File     : routes/api/index.js */
/* Author   : Vicente Garcia      */
/* Date     : 06/10/2022          */
/* Modified : 06/10/2022          */
/* ------------------------------ */
// Declare router as express router
const router = require('express').Router();
// Import user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
// Set suffix to routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// Export router to be used in all the project
module.exports = router;