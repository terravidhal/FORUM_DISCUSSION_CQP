const {
  findAllSessions,
  findDetailsSingleSession,
  createNewSession,
  updateExistingSession,
  deleteAnExistingSession,
} = require("../controllers/session.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");

module.exports = (app) => {
  app.get(
    "/api/sessions",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    findAllSessions
  );
  app.get(
    "/api/sessions/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    findDetailsSingleSession
  );
  app.post(
    "/api/sessions",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    createNewSession
  );
  app.patch(
    "/api/sessions/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    updateExistingSession
  );
  app.delete(
    "/api/sessions/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deleteAnExistingSession
  );
};
