const { Nourritures, Cuisiniers } = require("../models");

module.exports.prepareNourriture = async (req, res) => {
  const { cuisinierId, nomNourriture, description, prix, photo } = req.body;

  try {
    // Vérifie si le cuisinier existe
    const cuisinier = await Cuisiniers.findByPk(cuisinierId);

    if (!cuisinier) {
      return res.status(404).json({ message: "Le cuisinier n'existe pas." });
    }

    // Ajoute une nouvelle nourriture préparée par le cuisinier
    const nouvelleNourriture = await Nourritures.create({
      nom: nomNourriture,
      description: description,
      prix: prix,
      photo: photo,
    });

    // Ajoute la relation "Cuisinier - Nourriture"
    await cuisinier.addNourriture(nouvelleNourriture);

    res
      .status(201)
      .json({ message: "Nouvelle nourriture ajoutée avec succès." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la nourriture." });
  }
};
