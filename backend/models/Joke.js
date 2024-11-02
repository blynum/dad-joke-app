// Joke Model (models/Joke.js)
const mongoose = require('mongoose'); // Add this line

const JokeSchema = new mongoose.Schema({
    joke: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Joke', JokeSchema);
