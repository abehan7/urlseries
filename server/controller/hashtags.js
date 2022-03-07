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

// const getTotalTags = async (req, res) => {
//   console.log("getTotalTags");
//   console.log(req.user.id);

//   const query = { user_id: req.user.id };
//   const options = { _id: 0, hashtag_total: 1 };
//   try {
//     const result = await db.Hashtags.findOne(query, options);
//     console.log(result);

//     res.status(200).json(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

const updateLikeTags = async (req, res) => {
  const { oneLineTags } = req.body;
  const user_id = req.user.id;
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

module.exports = { updateLikeTags, getAssignedtags };
