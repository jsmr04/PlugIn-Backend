const express = require("express");
const crypto = require("crypto");
const Users = require("../models/User");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//constants
const ITERATIONS = 10000;
const KEYLEN = 64;
const ENCRYPTION_METHOD = "sha1";
const ONE_YEAR = 60 * 60 * 24 * 365; // One year in seconds

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  //Generate salt
  crypto.randomBytes(16, (error, salt) => {
    const newSalt = salt.toString("base64");

    //Generate encrypted password
    crypto.pbkdf2(
      password,
      newSalt,
      ITERATIONS,
      KEYLEN,
      ENCRYPTION_METHOD,
      (error, key) => {
        const encryptedPassword = key.toString("base64");

        //Try to find user
        Users.findOne({ username })
          .exec()
          .then((user) => {
            if (user) {
              return res.status(400).send("This user already exists");
            }
            //Create new user
            User.create({
              username,
              password: encryptedPassword,
              salt: newSalt,
              role,
            }).then(() => {
              res.send("User created successfully");
            });
          });
      }
    );
  });
});

router.post("/signin", (req, res) => {

  const { username, password } = req.body;
  User.findOne({ username })
    //Get user
    .then((user) => {
      if (!user) {
        return res.status(400).send("User and password do not match");
      }

      //Encrypt password using salt
      crypto.pbkdf2(
        password,
        user.salt,
        ITERATIONS,
        KEYLEN,
        ENCRYPTION_METHOD,
        (error, key) => {
          const encryptedPassword = key.toString("base64");
          //Validate encrypted password
          if (user.password === encryptedPassword) {
            const token = signToken(user._id);
            return res.send({ _id:user._id, token });
          }else{
            return res.status(400).send("User and password do not match");
          }
        }
      );
    });
});

router.put("/user-info/", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const title = req.body.title;
  const address = req.body.address;
  const status = req.body.status;
  const pictureUrl = req.body.pictureUrl;
  const skills = req.body.skills;
  const instruments = req.body.instruments;
  const genres = req.body.genres;
  const about = req.body.about;

  const userData = {
    name,
    address,
    title,
    status,
    pictureUrl,
    skills,
    instruments,
    genres,
    about,
  };

  console.log(userData)

  User.findOne({ username }).then((user) => {
    if (user) {
      User.findOneAndUpdate({ username }, userData).then(() => {
        res.sendStatus(200);
      });
    } else {
      res.status(400).send("User does not exist")
    }
  });
});

router.get("/user-info/", (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      const newUsers = users.map((user) => {

        const newUser = {
          _id: user._id,
          username: user.username,
          role: user.role,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          title: user.title,
          address: user.address,
          status: user.status,
          pictureUrl: user.pictureUrl,
          skills: user.skills,
          instruments: user.instruments,
          genres: user.genres,
          about: user.about,
        };

        return newUser;
      });

      res.send(newUsers);
    });
});

router.get("/user-info/:id", (req, res) => {

  User.findById(req.params.id)
    .exec()
    .then((user) => {
        
      if (!user){
        return res.status(400).send("User does not exist")
      }  

      const newUser = {
        _id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        title: user.title,
        address: user.address,
        status: user.status,
        pictureUrl: user.pictureUrl,
        skills: user.skills,
        instruments: user.instruments,
        genres: user.genres,
        about: user.about,
      };

      res.send(newUser);
    });
});

const signToken = (_id) => {
  return jwt.sign({ _id }, "secret", {
    expiresIn: ONE_YEAR,
  });
};

module.exports = router;
