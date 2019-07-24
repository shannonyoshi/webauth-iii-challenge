
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "fireperson", password: '12345', department: "fire"},
        {username: "fireperson1", password: '12345', department: "fire"},
        {username: "fireperson2", password: '12345', department: "fire"},
        {username: "policeperson", password: '12345', department: "police"},
        {username: "policeperson1", password: '12345', department: "police"},
        {username: "EMT", password: '12345', department: "emergency"},
        {username: "EMT1", password: '12345', department: "emergency"}
      ]);
    });
};
