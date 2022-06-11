/* ----------------------------- */
/* Project  : Social Network API */
/* File     : user-routes.js     */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/10/2022         */
/* ----------------------------- */
// Declare router as express router
const router = require('express').Router();
// Declare routes
const { getAllUser
       ,getUserById
       ,createUser
       ,updateUser
       ,deleteUser
       ,createFriend
       ,deleteFriend} = require('../../controllers/user-controller');
// Set up GET all and POST at /api/users
router.route('/')
      .get(getAllUser)
      .post(createUser);
// Set up GET one, PUT and DELETE at /api/users/:userId
router.route('/:userId')
      .get(getUserById)
      .put(updateUser)
      .delete(deleteUser);
// Set up PUT and DELETE at /api/users/:userId/fiends/:friendId
router.route('/:userId/friends/:friendId')
      .post(createFriend)
      .delete(deleteFriend);
// Export router to be used in all the project
module.exports = router;