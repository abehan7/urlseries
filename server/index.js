const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const UrlModel = require("./models/Urls");

mongoose.connect(
  "mongodb+srv://illbeatdisney:Oat97c53AmCkt4lH@urlapp.ankxa.mongodb.net/ururl?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.get("/hi", async (req, res) => {
  const url = new UrlModel({
    id: "0",
    url: "https://www.youtube.com/watch?v=wgGkF4k9c7A",
    title: "CRUD Tutorial Using MERN Stack",
    hashTags: ["#mern", "#몽고", "페드로테크", "페드로"],
  });

  try {
    await url.save();
    res.send("inserted data");
    console.log("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
