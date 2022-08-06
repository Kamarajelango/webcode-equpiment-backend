const route = require("express").Router()
const service = require("../modules/verifymail")

route.put("/:id" , service.verifyMail)

module.exports = route;