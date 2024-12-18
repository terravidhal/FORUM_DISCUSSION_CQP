const {
  createAudLog,
  getAllAudLogCertificate,
} = require("../controllers/logCertif.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");

module.exports = (app) => {
  app.post(
    "/api/audLog",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    createAudLog
  );
  app.get(
    "/api/audLog",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    getAllAudLogCertificate
  );
};
