const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

//cree un user
module.exports.addUsers = async (req, res) => {
  const { nom, prenom, email, adresse, telephone, username, password } =
    req.body;

  try {
    const cryptPassword = await bcrypt.hash(password, 10);
    const inscrip = await Users.create({
      nom,
      prenom,
      email,
      adresse,
      telephone,
      username,
      password: cryptPassword,
    });

    res
      .status(200)
      .json({ message: "client enregistrer avec succes", inscrip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //   res.json({ message: "utilisateur Creer" });
};
// afficher un user
module.exports.getUsers = async (req, res) => {
  try {
    const utilisateurs = await Users.findAll();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //   res.json({ message: "voici les utilisatuers" });
};
//afficher un user par son id
module.exports.getUsersById = async (req, res) => {
  const iduser = req.params.id;
  try {
    const utilisateur = await Users.findByPk(iduser);
    if (utilisateur) {
      res.status(200).json(utilisateur);
    } else {
      res
        .status(200)
        .json({ message: "Aucun utilisateur trouvé avec l'ID spécifié." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //   res.json({ message: "voici les utilisatuers" });
};
//mettre a jour un user
module.exports.updateUser = async (req, res) => {
  const iduser = req.params.id;
  const update = req.body;
  try {
    const upuser = await Users.update(update, { where: { iduser } });
    res.status(200).json(upuser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//supprimer un user
module.exports.deleteUsers = async (req, res) => {
  const iduser = req.params.id;
  try {
    const deleteUser = await Users.destroy({ where: { iduser } });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//se connecter
module.exports.connectUsers = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    //compare passeword
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }
    //token used
    const token = Jwt.sign({ iduser: user.id }, "shhhhh", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Connexion réussie.", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
