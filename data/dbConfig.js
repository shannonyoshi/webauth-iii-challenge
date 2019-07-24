const knex = require("knex")

const config = require("../knexfile")

modeule.exports = knex(config.development)