const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostComment = mongoose.model('PostComment', new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
}))

module.exports = PostComment

