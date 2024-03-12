const Cuisiniers = require("../models/Cuisiniers");
const bcrypt = require("bcrypt");

module.exports.addcuisinier = async (req, res) => {
  try {
    const inscrip = await Cuisiniers.create(req.body);
    res.status(200).json(inscrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCuisinier = async (req, res) => {
  try {
    const cuisiniers = await Cuisiniers.findAll();
    res.status(200).json(cuisiniers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.json({ message: "voici tous les cuisinier" });
};

module.exports.getCuisinierById = async (req, res) => {
  const idcuisinier = req.params.id;
  try {
    const cuisinier = await Cuisiniers.findByPk(idcuisinier);
    if (cuisinier) {
      res.status(200).json(cuisinier);
    } else {
      res
        .status(200)
        .json({ message: "Aucun cuisiniers trouvé avec l'ID spécifié." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateCuisinier = async (req, res) => {
  const idcuisinier = req.params.id;
  const update = req.body;
  try {
    const upchef = await Cuisiniers.update(update, { where: { idcuisinier } });
    res.status(200).json(upchef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCuisinier = async (req, res) => {
  const idcuisinier = req.params.id;
  try {
    const deletechef = await Cuisiniers.destroy({ where: { idcuisinier } });
    res.status(200).json(deletechef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.connectCuisinier = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await Cuisiniers.findOne({ where: { login } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const isPasswordValid = await bcrypt.compare(password, Cuisiniers.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    res.status(200).json({ message: "Connexion réussie." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
