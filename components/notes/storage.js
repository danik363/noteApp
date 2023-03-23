const model = require("./model.js");

async function create(note) {
  try {
    return await new model(note).save();
  } catch (err) {
    console.log("Error al guardar la nota");
  }
}

async function list(filter) {
  try {
    return await model.find(filter);
  } catch (err) {
    console.log("Error al listar las notas" + err);
  }
}

async function update(id, note) {
  try {
    const result = await model.findOneAndUpdate({ _id: id }, note);
    return result;
  } catch (err) {
    console.log(`No se pudo actualizar correctamente la nota ${id}`);
  }
}

async function deleteNote(id) {
  try {
    const result = model.findOneAndDelete({ _id: id });
    return result;
  } catch (err) {
    console.log(`No se pudo eliminar la nota ${id}`);
  }
}
module.exports = {
  create,
  list,
  update,
  delete: deleteNote,
};
