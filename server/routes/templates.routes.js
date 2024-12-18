const {
  findAllTemplates,
  deleteTemplate,
  uploadNewTemplate,
} = require("../controllers/template.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");
const { uploadTemplates } = require("../config/multer.config");

module.exports = (app) => {
  app.post(
    "/api/templates",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    uploadTemplates.single("template"), // "name" attribute for "input field"
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).send("Aucun template n'a été téléchargé.");
      }
      console.log("Fichier reçu :", req.file);
      next();
    },
    uploadNewTemplate
  );
  app.get(
    "/api/templates",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    findAllTemplates
  );

  app.delete(
    "/api/templates/:templateId",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deleteTemplate
  );
};
