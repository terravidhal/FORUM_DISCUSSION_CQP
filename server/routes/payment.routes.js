const {
  createNewPayment,
  findAllPayments,
  deletePayment,
} = require("../controllers/payment.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");
const { upload } = require("../config/multer.config");

module.exports = (app) => {
  app.post(
    "/api/payment",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    upload.single("receipt"), // "name" attribute for "input field"
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).send("Aucune image n'a été téléchargée.");
      }
      console.log("Fichier reçu :", req.file);
      next();
    },
    createNewPayment
  );
  app.get(
    "/api/payments",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    findAllPayments
  );

  app.delete(
    "/api/payments/:paymentId/:studentId",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deletePayment
  );
};
