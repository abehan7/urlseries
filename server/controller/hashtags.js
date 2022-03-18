const db = require("../models");

const getAssignedtags = async (req, res) => {
  console.log("getAssignedtags");
  const user_id = req.user.id;
  const query = { user_id };
  const options = { _id: 0, hashtag_assigned: 1 };
  try {
    const result = await db.Hashtags.findOne(query, options);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const updateLikeTags = async (req, res) => {
  const user_id = req.user.id;
  const { tags } = req.body;
  console.log(tags);
  const query = { user_id };
  const update = { $set: { hashtag_assigned: tags } };
  try {
    await db.Hashtags.updateOne(query, update);
    res.json({ message: "success" });
    console.log("changed assigned tag");
  } catch (err) {
    console.log(err);
    res.json({ message: "fail" });
  }
};

module.exports = { updateLikeTags, getAssignedtags };
