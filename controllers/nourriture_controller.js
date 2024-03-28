const Nourritures = require("../models/Nourritures");

//Create
module.exports.addNourriture = async (req, res) => {
  try {
    const ajoute = await Nourritures.create(req.body);
    res.status(201).json(ajoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Read
module.exports.getNourriture = async (req, res) => {
  try {
    const nourriture = await Nourritures.findAll();
    res.status(200).json(nourriture);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.json({ message: "voici tous les Nourritures" });
};
//Read by id
module.exports.getNourritureById = async (req, res) => {
  const idnourr = req.params.id;
  try {
    const nourriture = await Nourritures.findByPk(idnourr);
    if (nourriture) {
      res.status(200).json(nourriture);
    } else {
      res
        .status(404)
        .json({ message: "Aucun nourriture trouvé avec l'ID spécifié." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Update
module.exports.updateNourriture = async (req, res) => {
  const idnourr = req.params.id;
  const update = req.body;
  try {
    const upnourr = await Nourritures.update(update, { where: { idnourr } });
    res.status(200).json(upnourr);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Delete
module.exports.deleteNourriture = async (req, res) => {
  const idnourr = req.params.id;
  try {
    const deletenourr = await Nourritures.destroy({ where: { idnourr } });
    res.status(204).json(deletenourr);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
