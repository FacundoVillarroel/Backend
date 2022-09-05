const MongoUsers = require ("./persistence");

const getUser = async (sessionUser) => {
  const user = (await MongoUsers.findUser(sessionUser))[0]
  return user
}

module.exports = getUser