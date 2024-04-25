const Cuisiniers = require("../models/Cuisiniers");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

module.exports.addcuisinier = async (req, res) => {
  const { nom, prenom, email, adresse, telephone, password } = req.body;

  try {
    const cryptPassword = await bcrypt.hash(password, 10);
    const inscrip = await Cuisiniers.create({
      nom,
      prenom,
      email,
      adresse,
      telephone,
      password: cryptPassword,
    });
    res
      .status(201)
      .json({ message: "cuisinier enregistrer avec succes", inscrip });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getCuisinier = async (req, res) => {
  try {
    const cuisiniers = await Cuisiniers.findAll();
    res.status(200).json(cuisiniers);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
        .status(404)
        .json({ message: "Aucun cuisiniers trouvé avec l'ID spécifié." });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.updateCuisinier = async (req, res) => {
  const idcuisinier = req.params.id;
  const update = req.body;
  try {
    const upchef = await Cuisiniers.update(update, { where: { idcuisinier } });
    res.status(200).json(upchef);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.deleteCuisinier = async (req, res) => {
  const idcuisinier = req.params.id;
  try {
    const deletechef = await Cuisiniers.destroy({ where: { idcuisinier } });
    res.status(204).json(deletechef);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.connectCuisinier = async (req, res) => {
  const { telephone, password } = req.body;
  try {
    const cuisinier = await Cuisiniers.findOne({ where: { telephone } });
    if (!cuisinier) {
      return res.status(404).json({ message: "Cusinier non trouvé." });
    }
    //compare passeword
    const isPasswordValid = await bcrypt.compare(password, cuisinier.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Mot de passe incorrect." });
    }
    //used token
    const token = Jwt.sign({ idcuisinier: cuisinier.id }, "shhhhh", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Connexion réussie.", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
