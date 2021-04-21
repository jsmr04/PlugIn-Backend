//Libraries
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Event = require('./models/Event')
const User = require('./models/User')
const { v2: cloudinary } = require("cloudinary");

//Routes
const auth = require('./routes/auth')
const posts = require('./routes/posts')
const ratings = require('./routes/ratings')
const vacancy = require('./routes/vacancies')

//Express instance
const app = express()

//Plugins
app.use(bodyParser.json( { limit: '50mb' } ) )
app.use(cors())

//Connect to mongo atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false, useCreateIndex:true })

//Cloudinary configuration
cloudinary.config(JSON.parse(process.env.CLOUDINARY_CONFIG));

/* APPLY ROUTES */
app.use('/api/auth', auth)
app.use('/api/posts', posts)
app.use('/api/ratings', ratings)
app.use('/api/vacancies', vacancy)

/* EVENTS */
app.get("/api/events/", async (req, res) => {    
    const events = await Event.find().exec()
    const userIds = events.map(event => event.userId)
    const users = await User.find({ _id: { $in: userIds }}).exec()

    let eventsWithUserList = [] 
    
    events.forEach(x => { 
        const user = users.filter(u => u._id.toString() === x.userId.toString())[0]
        if (user){
            const eventWithUser = {
                _id: x._id,
                userId: x.userId,
                title: x.title,
                datetime: x.datetime,
                location: x.location,
                media: x.media,
                description: x.description,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
                //User attributes
                name: user.name,
                pictureUrl: user.pictureUrl,
            }
            eventsWithUserList.push(eventWithUser)

        }
    })

    res.status(200).send(eventsWithUserList)
});

app.get("/api/events/:id", (req, res) => {
    Event.findOne({ _id: req.params.id })
    .exec()
    .then((x) => res.status(200).send(x));
});

app.post("/api/events/", (req, res) => {
    Event.create(req.body).then((x) =>
    res.status(200).send(x)
  );
});

app.put("/api/events/:id", (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(() => res.sendStatus(204));
});

app.delete("/api/events/:id", (req, res) => {
    Event.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

/* STORAGE */
app.post("/api/storage/", (req, res) => {
    uploadFileToCloudinary(req.body.folder, req.body.base64string).then((x) => {
      if (x.public_id) {
        res.status(200).json({ id: x.public_id, url: x.secure_url });
      } else {
        res.status(400).send(x);
      }
    })
    .catch(()=>{
      res.sendStatus(400);
    })
});
  
const uploadFileToCloudinary = async (folder, base64string) => {
    try {
      return await cloudinary.uploader.upload(base64string, {
        folder: folder,
      });
    } catch (e) {
      return e;
    }
};

module.exports = app