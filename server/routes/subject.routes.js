const {
  findAllSubject,
  findDetailsSingleSubject,
  createNewSubject,
  deleteSubject,
  voteOnSubject,
} = require("../controllers/subject.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");


module.exports = (app) => {
  app.post(
    "/api/subjects",
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
