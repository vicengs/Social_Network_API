/* ----------------------------- */
/* Project  : Social Network API */
/* File     : routes/index.js    */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/10/2022         */
/* ----------------------------- */
// Declare router as express router
const router = require('express').Router();
// Import all of the API routes from /api/index.js
const apiRoutes = require('./api');
// Set preffix to routes
router.use('/api', apiRoutes);
// Invoke routes
router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});
// Export router to be used in all the project
module.exports = router;