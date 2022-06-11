/* ----------------------------- */
/* Project  : Social Network API */
/* File     : models/index.js    */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/10/2022         */
/* ----------------------------- */
// Import User model
const User = require('./User');
// Import Thought model
const Thought = require('./Thought');
// Export to use in all project User and Thought models
module.exports = { User, Thought };