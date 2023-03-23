const storage = require("./storage.js");

function createNote(note) {
  return new Promise(async (resolve, reject) => {
    note.lastUpdate = Date();
    const newUser = await storage.create(note);
    console.log(newUser);
    if (!newUser) {
      reject(false);
    } else {
      resolve(newUser);
    }
  });
}

function listNotes(filter) {
  return new Promise(async (resolve, reject) => {
    const result = await storage.list(filter);
    if (result) {
      resolve(result);
    } else {
      reject(false);
    }
  });
}

function updateNote(id, note) {
  return new Promise(async (resolve, reject) => {
    const modifiedNote = await storage.update(id, note);
    if (!modifiedNote) {
      reject(false);
    } else {
      resolve(true);
    }
  });
}

function deleteNote(id) {
  return new Promise(async (resolve, reject) => {
    const result = await storage.delete(id);
    if (!result) {
      reject(false);
    } else {
      resolve(true);
    }
  });
}

module.exports = {
  createNote,
  listNotes,
  updateNote,
  deleteNote,
};
