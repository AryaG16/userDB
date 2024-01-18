const express = require("express");

const User = require("../models/user");

const router = express.Router();
const UserController = require("../controller/userdetails.controller");

router.route("").post(UserController.addUser).get(UserController.getUsers);
// router.post("", (req, res, next) => {
//   // const user = req.body;
//   const user = new User({
//     name: req.body.name,
//     age: req.body.age,
//     phone: req.body.phone,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   user
//     .save() //by mongoose, making query of mongod auto
//     .then((addedUser) => {
//       res.status(201).json({
//         message: "User added successfully",
//       });
//     });
// });

// router.get("", (req, res, next) => {
//   User.find().then((documents) => {
//     res.status(200).json({
//       message: `Users fetched successfully`,
//       users: documents,
//     });
//   });
// });

router
  .route("/:id")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

// router.get("/:id", (req, res, next) => {
//   User.findById(req.params.id).then((userExists) => {
//     if (userExists) {
//       res.status(200).json({
//         message: "Specific user found!.",
//         userExists,
//       });
//     } else {
//       res.status(404).json({ message: "User not found!." });
//     }
//   });
// });

// router.put("/:id", (req, res, next) => {
//   const user = new User({
//     _id: req.params.id,
//     name: req.body.name,
//     age: req.body.age,
//     phone: req.body.phone,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   User.findById(req.params.id).then((userExists) => {
//     if (userExists) {
//       User.updateOne({ _id: req.params.id }, user)
//         .then((exist) => {
//           res.status(200).json({ message: "Update successful!." });
//         })
//         .catch(() => {
//           console.log("Error while updating");
//         });
//     } else {
//       res.status(404).json({ message: "Cannot Update :: User not found!." });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   User.findById(req.params.id).then((userExists) => {
//     if (userExists) {
//       User.deleteOne({ _id: req.params.id }).then(() => {
//         res.status(200).json({ message: "User deleted!." });
//       });
//     } else {
//       res.status(404).json({ message: "Cannot delete :: User not found!." });
//     }
//   });
// });

module.exports = router;
