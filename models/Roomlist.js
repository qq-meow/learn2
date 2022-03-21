const db = require('../db');

module.exports = db.defineModel('roomlist', {
    ownerId: db.ID,
    roomName: db.STRING(100)
});