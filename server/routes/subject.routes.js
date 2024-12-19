const {
  findAllSubject,
  findDetailsSingleSubject,
  createNewSubject,
  deleteSubject,
  voteOnSubject,
} = require("../controllers/subject.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");
const { upload } = require("../config/multer.config");

module.exports = (app) => {
  app.post(
    "/api/subjects",
    authenticate,
    logActivityMiddleware,
    upload.single("subject"), // "name" attribute for "input subject"
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).send("Aucune image n'a été téléchargée.");
      }
      console.log("Fichier reçu :", req.file);
      next();
    },
    createNewSubject
  );
  app.get(
    "/api/subjects",
    authenticate,
    logActivityMiddleware,
    findAllSubject
  );
  app.get(
    "/api/subjects/:id",
    authenticate,
    logActivityMiddleware,
    findDetailsSingleSubject
  );

  app.patch(
    "/api/subjects/:subjectid",
    authenticate,
    logActivityMiddleware,
    voteOnSubject
  );

  app.delete(
    "/api/subjects/:subjectId",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deleteSubject
  );
};
