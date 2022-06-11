/* ----------------------------- */
/* Project  : Social Network API */
/* File     : user-controller.js */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/11/2022         */
/* ----------------------------- */
const { Console } = require('console');
const { User, Thought } = require('../models');
const userController = {
    // Get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts'
           ,select: '-__v'
        })
        .populate({
            path: 'friends'
           ,select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: 'thoughts'
           ,select: '-__v'
        })
        .populate({
            path: 'friends'
           ,select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // Update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            if (dbUserData.thoughts.length > 0){
                for (i = 0; i < dbUserData.thoughts.length; i++){
                    Thought.findOneAndDelete({ _id: dbUserData.thoughts[i]._id })
                    .then(dbThoughtData => {console.log("Delete thoughts")})
                }
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Create friend
    createFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId }
           ,{ $push: { friends: params.friendId } }
           ,{ new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Delete Friend
    deleteFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId }
           ,{ $pull: { friends: params.friendId } }
           ,{ new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}
// Export user controller to be used for all the project
module.exports = userController;