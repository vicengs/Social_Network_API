/* ----------------------------- */
/* Project  : Social Network API */
/* File     : user-controller.js */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/11/2022         */
/* ----------------------------- */
// Import User and Thought models
const { User, Thought } = require("../models");
// Define user controller (routes functionality)
const userController = {
    // Get all users with subdocuments thoughts and friends
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: "thoughts"
           ,select: "-__v"
        })
        .populate({
            path: "friends"
           ,select: "-__v"
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Get one user by id with subdocuments thoughts and friends
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: "thoughts"
           ,select: "-__v"
        })
        .populate({
            path: "friends"
           ,select: "-__v"
        })
        .select("-__v")
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            };
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
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            };
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            };
            // Bonus, check if there are thoughts associated to user
            if (dbUserData.thoughts.length > 0){
                for (i = 0; i < dbUserData.thoughts.length; i++){
                    // Delete thoughts associated to user
                    Thought.findOneAndDelete({ _id: dbUserData.thoughts[i]._id }).then()
                };
            };
            // Check if the deleted user becomes to other user(s) as a friend
            User.find({})
            .then(dbFriendData => {
                for (i = 0; i < dbFriendData.length; i++){
                    if (dbFriendData[i].friends.length > 0){
                        for (j = 0; j < dbFriendData[i].friends.length; j++){
                            // Delete id user from friends array
                            User.findOneAndUpdate({ _id: dbFriendData[i]._id },{ $pull: { friends: params.userId } },{ new: true, runValidators: true }).then()
                        };
                    };
                };
            })
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Create friend
    createFriend({ params, body }, res) {
        // Validate the user be different to friend
        if (params.userId === params.friendId) {
            res.status(404).json({ message: "Friend can not be the same user" });
            return;
        } else {
            // Check if friend-user exists
            User.findOne({ _id: params.friendId })
            .then(dbFriendData => {
                // If no friend-user is found, send 404
                if (!dbFriendData){
                    res.status(404).json({ message: "No friend found with this id!" });
                    return;
                };
                // Check if friend exists for user to avoid duplicity
                User.findOne({ _id: params.userId })
                .then(dbUserFriendData => {
                    if (dbUserFriendData.friends.length > 0){
                        for (i = 0; i < dbUserFriendData.friends.length; i++){
                            if (dbUserFriendData.friends[i]._id == params.friendId){
                                res.status(404).json({ message: "Already is a friend of user" });
                                return;
                            };
                        };
                    };
                    // Add friend to friends array of user
                    User.findOneAndUpdate(
                        { _id: params.userId }
                       ,{ $push: { friends: params.friendId } }
                       ,{ new: true, runValidators: true })
                    .populate({
                        path: "friends"
                       ,select: "-__v"
                    })
                    .then(dbUserData => {
                        // If no user is found, send 404 (no insert in array, no exists)
                        if (!dbUserData) {
                            res.status(404).json({ message: "No user found with this id!" });
                            return;
                        };
                        res.json(dbUserData);
                    })
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
        };
    },
    // Delete Friend
    deleteFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId }
           ,{ $pull: { friends: params.friendId } }
           ,{ new: true, runValidators: true })
        .populate({
            path: "friends"
           ,select: "-__v"
        })
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}
// Export user controller to be used for all the project
module.exports = userController;