/* -------------------------------- */
/* Project  : Social Network API    */
/* File     : thought-controller.js */
/* Author   : Vicente Garcia        */
/* Date     : 06/10/2022            */
/* Modified : 06/11/2022            */
/* -------------------------------- */
// Import Thought and User models
const { Thought, User } = require("../models");
// Define user controller (routes functionality)
const thoughtController = {
    // Get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: "reactions"
           ,select: "-__v"
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: "reactions"
           ,select: "-__v"
        })
        .select("-__v")
        .then(dbThoughtData => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Create thought to user
    createThought({ params, body }, res) {
        User.findOne({ _id: body.userId })
        .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData){
                res.status(404).json({ message: "Thought no created because User " + body.userName + " no found!" });
                return;
            };
            // Create new thought if user exists
            Thought.create(body)
            //.then(({ _id }) => {
            .then(dbThoughtData => {
                // Create thought in thoughts array for user
                User.findOneAndUpdate(
                    { _id: body.userId }
                   ,{ $push: { thoughts: dbThoughtData._id } }
                   ,{ new: true }
                )
                .then(res.json(abc))
            })
        })
        .catch(err => res.json(err));
    },
    // Update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            // Search user owner of thought to delete (pull) from user's thoughts array
            User.find({})
            .then(dbUserData => {
                for (i = 0; i < dbUserData.length; i++){
                    if (dbUserData[i].thoughts.length > 0){
                        for (j = 0; j < dbUserData[i].thoughts.length; j++){
                            User.findOneAndUpdate({ _id: dbUserData[i]._id },{ $pull: { thoughts: params.thoughtId } },{ new: true, runValidators: true }).then()
                        }
                    }
                }
            })
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Create reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }
           ,{ $push: { reactions: body } }
           ,{ new: true, runValidators: true })
        .then(dbThoughtData => {
            // If no thought for reaction is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // Delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }
           ,{ $pull: { reactions: {reactionId: params.reactionId} } }
           ,{ new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No reaction found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};
module.exports = thoughtController;