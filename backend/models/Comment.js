const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joke: { type: mongoose.Schema.Types.ObjectId, ref: 'Joke' },
});

module.exports = mongoose.model('Comment', CommentSchema);