const db = require("../config/db");

module.exports.likeNourriture = async (req, res) => {
  const { idNourriture } = req.body;
  const idUser = req.user.id;

  try {
    // Exécutez une requête SQL pour insérer une entrée dans la table Liker
    await db.query(`INSERT INTO Aimer (idUser, idNourriture) VALUES (?, ?)`, {
      replacements: [idUser, idNourriture],
      type: db.QueryTypes.INSERT,
    });

    res.status(200).json({ message: "Opération de like réussie." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour disliker une nourriture
module.exports.dislikeNourriture = async (req, res) => {
  const { idNourriture } = req.body;
  const idUser = req.user.id;

  try {
    // Supprimer l'entrée de la table Liker
    await db.query(`DELETE FROM Aimer WHERE idUser = ? AND idNourriture = ?`, {
      replacements: [idUser, idNourriture],
      type: db.QueryTypes.DELETE,
    });
    res.status(200).json({ message: "Opération de dislike réussie." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
