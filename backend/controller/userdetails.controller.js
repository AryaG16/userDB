const User = require("../models/user");

exports.addUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save() //by mongoose, making query of mongod auto
    .then((addedUser) => {
      res.status(201).json({
        message: "User added successfully",
        userId: addedUser._id,
      });
    });
};

exports.getUsers = async (req, res) => {
  User.find().then((documents) => {
    res.status(200).json({
      message: `Users fetched successfully`,
      users: documents,
    });
  });
};

exports.getUser = async (req, res) => {
  User.findById(req.params.id).then((userExists) => {
    if (userExists) {
      res.status(200).json({
        message: "Specific user found!.",
        userExists,
      });
    } else {
      res.status(404).json({ message: "User not found!." });
    }
  });
};

exports.updateUser = async (req, res) => {
  const user = new User({
    _id: req.params.id,
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });

  User.findById(req.params.id).then((userExists) => {
    if (userExists) {
      User.updateOne({ _id: req.params.id }, user)
        .then((exist) => {
          res.status(200).json({ message: "Update successful!." });
        })
        .catch(() => {
          console.log("Error while updating");
        });
    } else {
      res.status(404).json({ message: "Cannot Update :: User not found!." });
    }
  });
};

exports.deleteUser = async (req, res) => {
  User.findById(req.params.id).then((userExists) => {
    if (userExists) {
      User.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({ message: "User deleted!." });
      });
    } else {
      res.status(404).json({ message: "Cannot delete :: User not found!." });
    }
  });
};
