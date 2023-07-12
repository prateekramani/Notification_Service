

const express = require('express')

const router = express.Router();

const {InfoController , EmailController} = require("../../controllers");




router.get("/info", InfoController.info)
// since above line is a last middleware to be called , so it becomes a controller , so we will 
// call the controller from here


router.post("/tickets" , EmailController.create);

module.exports = router;