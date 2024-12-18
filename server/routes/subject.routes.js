const {
  findAllSubject,
  findDetailsSingleSubject,
  createNewSubject,
  deleteSubject,
  voteOnSubject,
} = require("../controllers/subject.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");
//const { upload } = require("../config/multer.config");

module.exports = (app) => {
  app.post(
    "/api/subject",
    authenticate,
    logActivityMiddleware,
    createNewSubject
  );
  app.get(
    "/api/subjects",
    authenticate,
    logActivityMiddleware,
    findAllSubject
  );

  app.delete(
    "/api/payments/:paymentId/:studentId",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deletePayment
  );
};
