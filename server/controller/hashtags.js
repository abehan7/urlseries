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

  const hashtagInfo = await db.Hashtags.find({ user_id });

  const createDoc = async () => {
    await db.Hashtags.create({ user_id, hashtag_assigned: oneLineTags });
  };
  const updateDoc = async () => {
    await db.Hashtags.updateOne(query, { hashtag_assigned: oneLineTags });
  };

  hashtagInfo.length === 0 ? await createDoc() : await updateDoc();

  // const update = {
  //   $set: {
  //     hashtag_assigned: oneLineTags,
  //   },
  // };
  // await db.Hashtags.updateOne(query, update);
  console.log("changed assigned tag");
};

module.exports = { updateLikeTags, getAssignedtags };
