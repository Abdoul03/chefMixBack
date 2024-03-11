const Users = require("../models/Users");

//cree un user
module.exports.addUsers = async (req, res) => {
  try {
    const inscrip = await Users.create(req.body);
    res.status(200).json(inscrip);
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
