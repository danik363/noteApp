const storage = require("./storage.js");

function createUser(user) {
  return new Promise(async (resolve, reject) => {
    const result = await storage.listUsers({
      $or: [{ email: user.email }, { username: user.username }],
    });
    console.log(result);
    if (!result.length) {
      user.createDate = new Date();
      storage.create(user);
      resolve(user);
    } else {
      reject("Ya existe un usuario con ese email o username");
    }
  });
}

module.exports = {
  createUser,
};
