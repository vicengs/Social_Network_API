/* ----------------------------- */
/* Project  : Social Network API */
/* File     : Thought.js         */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/10/2022         */
/* ----------------------------- */
// Import function to date format
const dateFormat = require("../utils/dateFormat");
// Import schema, model and types from mongoose
const { Schema, model, Types } = require("mongoose");
// Create Reaction schema
const ReactionSchema = new Schema({
    // Set custom id to avoid confusion with parent thought _id
    reactionId: {
        type: Schema.Types.ObjectId
       ,default: () => new Types.ObjectId()
    }
   ,reactionBody: {
        type: String
       ,required: true
       ,max: [280, "Must be maximum 280, got {VALUE}"]
    }
    ,userName: {
        type: String
       ,required: true
       ,trim: true
    }
   ,createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});
// Create Thought schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String
        ,required: true
        ,min: [1, "Must be at least 1, got {VALUE}"]
        ,max: [280, "Must be maximum 280, got {VALUE}"]
    }
   ,userName: {
        type: String
       ,required: true
       ,trim: true
    }
    ,createdAt: {
      type: Date
     ,default: Date.now
     ,get: createdAtVal => dateFormat(createdAtVal)
    }
   ,reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true
       ,getters: true
    }
   ,id: false
});
// Get total count of reactions
ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});
// create the Thought model using the ThoughtSchema
const Thought = model("Thought", ThoughtSchema);
// Export the Thought model
module.exports = Thought;