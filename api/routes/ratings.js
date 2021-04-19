const express = require("express");
const Rating = require("../models/Rating");

const router = express.Router();

router.get("/", (req, res) => {
    Rating.find()
    .exec()
    .then((x) => res.status(200).send(x));
});

router.get("/:id", (req, res) => {
    Rating.findOne({ _id: req.params.id })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.post("/", (req, res) => {
    Rating.create(req.body).then((x) =>
    res.status(200).send(x)
  );
});

router.put("/:id", (req, res) => {
    Rating.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(() => res.sendStatus(204));
});

router.delete("/:id", (req, res) => {
    Rating.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

module.exports = router;