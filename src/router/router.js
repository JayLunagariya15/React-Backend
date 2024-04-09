const express = require("express");
const Router = express.Router();

const userControllers = require("../controllers/userController");

Router.post("/register", userControllers.register);
Router.post("/login", userControllers.login);
// Router.post("/updateone", userControllers.updateone);
// Router.post("/updatemany", userControllers.updatemany);
// Router.post("/deleteone", userControllers.deleteone);
// Router.post("/deletemany", userControllers.deletemany);
// Router.post("/insertone", userControllers.insertuser);
// Router.get("/", userControllers.finduser);
// Router.get("/username", userControllers.getoneuser); // query
// Router.post("/findbyid", userControllers.findbyID);
// Router.get("/findandupdate", userControllers.modify);
// Router.post("/match", userControllers.mat);

module.exports = Router;
