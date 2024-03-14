const Commandes = require("../models/Commandes");

//Create
module.exports.addCommande = async (req, res) => {
  try {
    const commander = await Commandes.create(req.body);
    res.status(200).json(commander);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Read
module.exports.getCommande = async (req, res) => {
  try {
    const commandes = await Commandes.findAll();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.json({ message: "voici tous les Commandes" });
};
//Read by id
module.exports.getCommandeById = async (req, res) => {
  const numcomm = req.params.id;
  try {
    const commande = await Commandes.findByPk(numcomm);
    if (commande) {
      res.status(200).json(commande);
    } else {
      res
        .status(200)
        .json({ message: "Aucune commande trouvée avec l'ID spécifié." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Update
module.exports.updateCommande = async (req, res) => {
  const numcomm = req.params.id;
  const update = req.body;
  try {
    const upcomm = await Commandes.update(update, { where: { numcomm } });
    res.status(200).json(upcomm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Delete
module.exports.deleteCommande = async (req, res) => {
  const numcomm = req.params.id;
  try {
    const deletecomm = await Commandes.destroy({ where: { numcomm } });
    res.status(200).json(deletecomm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
