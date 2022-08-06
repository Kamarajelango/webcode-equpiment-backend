
const route = require("express").Router()
const service = require("../modules/sort")

route.get("/asc" , service.ascending)
route.get("/dsc" , service.descending)
module.exports = route;