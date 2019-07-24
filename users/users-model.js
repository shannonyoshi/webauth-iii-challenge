const db = require("../data/dbConfig");

module.exports = { find, findBy, add, findById };

function find() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
    .select("id", "username", "department");
}
