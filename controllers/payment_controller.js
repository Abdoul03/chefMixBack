const Paymentmethods = require("../models/Paymentmethods");

//Create
module.exports.addPayment = async (req, res) => {
  try {
    const moyensPayment = await Paymentmethods.create(req.body);
    res.status(201).json(moyensPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Read
module.exports.getPayment = async (req, res) => {
  try {
    const moyensPayments = await Paymentmethods.findAll();
    res.status(200).json(moyensPayments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.json({ message: "voici tous les moyens de payemnt" });
};
//Read by id
module.exports.getPaymentById = async (req, res) => {
  const idpaymethod = req.params.id;
  try {
    const moyensPayment = await Paymentmethods.findByPk(idpaymethod);
    if (moyensPayment) {
      res.status(200).json(moyensPayment);
    } else {
      res.status(404).json({
        message: "Aucun moyen de payement trouvée avec l'ID spécifié.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Update
module.exports.updatePayment = async (req, res) => {
  const idpaymethod = req.params.id;
  const update = req.body;
  try {
    const uppay = await Paymentmethods.update(update, {
      where: { idpaymethod },
    });
    res.status(200).json(uppay);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Delete
module.exports.deletePayment = async (req, res) => {
  const idpaymethod = req.params.id;
  try {
    const deletepay = await Paymentmethods.destroy({ where: { idpaymethod } });
    res.status(204).json(deletepay);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
