const User = require("../models/user");

async function getById(id) {
    return User.findById(id);
}

module.exports = { getById }