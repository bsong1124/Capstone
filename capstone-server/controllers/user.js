const { User } = require("../models/user");

const createProfile = async (req, res) => {
  // console.log('REQ.BODY', req.body)
  // console.log('working')
  try {
    const profile = await User.findOne({ googleId: req.body.googleId });
    if (profile) {
      // console.log({profile})
    } else {
      const newProfile = await User.create(req.body);
      res.json(newProfile);
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

const getProfile = async (req, res) => {
  // console.log("GET PROFILE");
  // console.log("REQ.QUERY.Q", req.query.q);
  const q = req.query.q;
  try {
    const profile = await User.findOne({ googleId: q });
    console.log({ profile });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.json({ message: "error", error: res.status.text });
  }
};

const editProfile = async (req, res) => {
  // console.log("REQ.BODY", req.body);
  try {
    const profile = await User.findOneAndUpdate(
      { googleId: req.body.googleId },
      req.body,
      {
        new: true,
      }
    );
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.status.text });
  }
};

const remove = async () => {};

module.exports = {
  createProfile,
  getProfile,
  editProfile,
  delete: remove,
};
