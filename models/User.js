/* ----------------------------- */
/* Project  : Social Network API */
/* File     : User.js            */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/10/2022         */
/* ----------------------------- */
// Import function to date format
const dateFormat = require("../utils/dateFormat");
// Import schema and model methods from mopngoose
const { Schema, model } = require("mongoose");
// Create User schema
const UserSchema = new Schema({
    userName: {
        type: String
       ,unique: true
       ,required: [true, "Username is Required"]
       ,trim: true
    }
   ,email: {
        type: String
       ,unique: true
       ,required: [true, "Email is Required"]
       ,match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid e-mail address"]
       ,trim: true
    }
   ,createdAt: {
        type: Date
       ,default: Date.now
       ,get: (createdAtVal) => dateFormat(createdAtVal)
    }
   ,thoughts: [{
        type: Schema.Types.ObjectId
       ,ref: "Thought"
    }]
   ,friends: [{
        type: Schema.Types.ObjectId
       ,ref: "User"
    }]
},
{
    toJSON: {
        virtuals: true
       ,getters: true
    },
    id: false
});
// Get total count of friends
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
    //return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
// Create the User model using the UserSchema
const User = model("User", UserSchema);
// Export the User model
module.exports = User;