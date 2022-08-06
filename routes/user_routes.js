const route = require("express").Router()
const service = require("../modules/login")

route.post("/register" , service.register)
route.post("/login" , service.login)

module.exports = route;