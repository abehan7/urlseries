const db = require("../models");

const updateLikeTags = async (req, res) => {
  const { oneLineTags } = req.body;
  const { user_id } = req.decodedData;

  console.log(oneLineTags);
  const query = { user_id };
  const update = {
    $set: {
      hashtag_assigned: oneLineTags,
    },
  };

  try {
    await db.Hashtags.updateOne(query, update);
    console.log("changed assigned tag");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateLikeTags };
