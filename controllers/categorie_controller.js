const Categories = require("../models/Categories");

module.exports.addCategorie = async (req, res) => {
  try {
    const ajoute = await Categories.create(req.body);
    res.status(200).json(ajoute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCategorie = async (req, res) => {
  try {
    const categorie = await Categories.findAll();
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.json({ message: "voici tous les Categories" });
};

module.exports.getCategorieById = async (req, res) => {
  const idcatego = req.params.id;
  try {
    const categorie = await Categories.findByPk(idcatego);
    if (categorie) {
      res.status(200).json(categorie);
    } else {
      res
        .status(200)
        .json({ message: "Aucune categorie trouvée avec l'ID spécifié." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateCategorie = async (req, res) => {
  const idcatego = req.params.id;
  const update = req.body;
  try {
    const upcatego = await Categories.update(update, { where: { idcatego } });
    res.status(200).json(upcatego);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCategorie = async (req, res) => {
  const idcatego = req.params.id;
  try {
    const deletecatego = await Categories.destroy({ where: { idcatego } });
    res.status(200).json(deletecatego);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
