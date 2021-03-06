const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = mongoose.model('Post', new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    media: [{ url:String, type:{ type:String } }],
    description: { type: String, require: true },
}, {
    timestamps: true,
}))

module.exports = Post
