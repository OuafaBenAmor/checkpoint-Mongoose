const express = require("express");
const cors = require("cors");
const server = express();
require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5000;
server.use(cors());

const Blog = require("./models/blog");
//Create and Save a Record of a Model
const Ouafa = new Blog({
  name: "Ouafa",
  age: 39,
  favoriteFoods: ["Apple", "banana"],
});

Ouafa.save(function (err, data) {
  if (err) {
    console.log("Failed");
  } else {
    console.log("Saved Successful", data);
  }
});

//Create Many Records with model.create()
const arrayOfPeople = [
  {
    id: 1,
    name: "Rabeb",
    age: 25,
    favoriteFoods: ["Pizza"],
  },
  {
    id: 2,
    name: "Nejib",
    age: 28,
    favoriteFoods: ["Couscous"],
  },
];
Blog.create(arrayOfPeople, (err, data) => {
  if (err) {
    console.error(err);
  } else console.log(data);
});

//Use model.find() to Search Your Database
Blog.find({ name: "Rabeb" }, function (err, found) {
  if (err) {
    console.log(err);
  } else console.log(found);
});

//Use model.findOne() to Return a Single Matching Document from Your Database
Blog.findOne({ favoriteFoods: "Couscous" }, function (err, found) {
  if (err) {
    console.log(err);
  } else console.log(found);
});

//Use model.findById() to Search Your Database By _id
Blog.findById(Blog.id, function (err, found) {
  if (err) {
    console.log(err);
  } else console.log(found);
});
//Perform Classic Updates by Running Find, Edit, then Save

Blog.findByIdAndUpdate("637a84c974e1fcdf38239644", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    data.favoriteFoods.push("hamburger");
    data.save();
    console.log(data);
  }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName) => {
  const ageToSet = 20;

  Blog.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) {
        return err;
      }
      return updatedDoc;
    }
  );
};
findAndUpdate("Nejib");
//Delete One Document Using model.findByIdAndRemove
Blog.findByIdAndRemove("637a83507b374b1523520d8e", (error, deleted) => {
  if (error) {
    console.log(deleted);
  }
});
//MongoDB and Mongoose - Delete Many Documents with model.remove()

Blog.remove({ age: { $gt: 25 } }, (error, data) => {
  if (error) {
    console.log(error);
  }
});

//Chain Search Query Helpers to Narrow Search Results
Blog.find({ favoriteFoods: { $all: ["Cousous"] } })
  .sort({ age: "asc" })
  .limit(2)
  .select("name")
  .exec((error, data) => {
    if (error) {
      console.log(data);
    }
  });

server.listen(port, function () {
  console.log(
    "The server is running, " +
      "please, open your browser at http://localhost:%s",
    port
  );
});
