const express = require("express");
const Post = require("../models/Post");
const PostComment = require("../models/PostComment");
const User = require("../models/User");

const router = express.Router();

/* POSTS */
router.get("/", async (req, res) => {
    const posts = await Post.find().exec()
    const userIds = posts.map(post => post.userId)
    const users = await User.find({ _id: { $in: userIds }}).exec()

    let postsWithUserList = [] 
    
    posts.forEach(x => { 
        const user = users.filter(u => u._id.toString() === x.userId.toString())[0]

        if (user){
            const postsWithUser = {
                _id: x._id,
                userId: x.userId,
                media: x.media,
                description: x.description,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
                //User attributes
                name: user.name,
                pictureUrl: user.pictureUrl,
            }
            postsWithUserList.push(postsWithUser)

        }
    })

    res.status(200).send(postsWithUserList)

});

router.get("/:id", (req, res) => {
    Post.findOne({ _id: req.params.id })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.post("/", (req, res) => {
    Post.create(req.body).then((x) =>
    res.status(200).send(x)
  );
});

router.put("/:id", (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(() => res.sendStatus(204));
});

router.delete("/:id", (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

/* COMMENTS */
router.post("/comments", (req, res) => {
    PostComment.create(req.body).then((x) =>
    res.status(200).send(x)
  );
});

router.get("/comments-by-post/:postId", (req, res) => {
    PostComment.find({ postId: req.params.postId })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.get("/comments/:id", (req, res) => {
    PostComment.findOne({ _id: req.params.id })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.put("/comments/:id", (req, res) => {
    PostComment.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(() => res.sendStatus(204));
});

router.delete("/comments/:id", (req, res) => {
    PostComment.findByIdAndRemove(req.params.id)
    .exec()
    .then((x) => res.status(200).send(x));
});


module.exports = router;
