const ruuid = require('crypto').randomUUID;

const uuid = (start = 0, end = 5, charJoin = '-') => {
    return ruuid().split('-').slice(start, end).join(charJoin)
}

module.exports = uuid