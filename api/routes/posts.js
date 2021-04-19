const express = require("express");
const Post = require("../models/Post");
const PostComment = require("../models/PostComment");

const router = express.Router();

/* POSTS */
router.get("/", (req, res) => {
    Post.find()
    .exec()
    .then((x) => res.status(200).send(x));
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
