/* ----------------------------- */
/* Project  : Social Network API */
/* File     : server.js          */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/10/2022         */
/* ----------------------------- */
// Import express module
const express = require('express');
// Import mongoose module
const mongoose = require('mongoose');
// Declare app as express
const app = express();
// Declare PORT variable
const PORT = process.env.PORT || 3001;
// Set app properties
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Set route path
app.use(require('./routes'));
// Connect mongoose to project
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Use this to log mongo queries being executed
mongoose.set('debug', true);
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));