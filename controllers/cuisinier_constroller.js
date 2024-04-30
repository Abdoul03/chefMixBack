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
  // const idcuisinier = cuisinier.id
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
    // res.status(200).json({ message: "Connexion réussie." });

    // Recuper les donner du cuisinier connecter
    req.cuisinier = {
      id: cuisinier.id,
      nom: cuisinier.nom,
      prenom: cuisinier.prenom,
      adresse: cuisinier.adresse,
      telephone: cuisinier.telephone,
      email: cuisinier.email,
      // Ajoutez d'autres informations que vous souhaitez stocker
    };

    res.status(200).json({ message: "Connexion réussie." });
    // const cuisiniers = await Cuisiniers.findAll();
    ////used token
    // const token = Jwt.sign({ idcuisinier: cuisinier.id }, "shhhhh", {
    //   expiresIn: "1h",
    // });
    // res.status(200).json({ message: "Connexion réussie.", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware d'authentification
module.exports.authMiddleware = (req, res, next) => {
  // Vérifier si l'utilisateur est authentifié
  if (req.cuisinier) {
    // Si l'utilisateur est authentifié, passez à la prochaine fonction de middleware ou à la fonction de gestionnaire de route
    return next();
  } else {
    // Si l'utilisateur n'est pas authentifié, renvoyer une réponse d'erreur
    return res
      .status(401)
      .json({ message: "Non autorisé. Veuillez vous connecter." });
  }
};

module.exports.getConnectedCuisinierInfo = async (req, res) => {
  try {
    // Vous pouvez accéder aux informations du cuisinier à partir de req.cuisinier (si vous les avez attachées lors de l'authentification)
    const cuisinierInfo = {
      id: req.cuisinier.id,
      nom: req.cuisinier.nom,
      prenom: req.cuisinier.prenom,
      adresse: req.cuisinier.adresse,
      telephone: req.cuisinier.telephone,
      email: req.cuisinier.email,
      // Ajoutez d'autres informations que vous souhaitez récupérer
    };
    res.status(200).json({ cuisinier: cuisinierInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
