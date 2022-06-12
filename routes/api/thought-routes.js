/* ----------------------------- */
/* Project  : Social Network API */
/* File     : thought-routes.js  */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/11/2022         */
/* ----------------------------- */
// Declare router as express router
const router = require("express").Router();
// Declare routes
const { getAllThought
       ,getThoughtById
       ,createThought
       ,updateThought
       ,deleteThought
       ,createReaction
       ,deleteReaction } = require("../../controllers/thought-controller");
// Set up GET all and POST at /api/thoughts
router.route("/")
      .get(getAllThought)
      .post(createThought);
// Set up GET one, PUT and DELETE at /api/thoughts/:thoughtId
router.route("/:thoughtId")
      .get(getThoughtById)
      .put(updateThought)
      .delete(deleteThought);
// Set up POST at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
      .post(createReaction);
// Set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId")
      .delete(deleteReaction);
// Export router to be used in all the project
module.exports = router;