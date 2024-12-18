const {
    createCertificate,
  } = require("../controllers/certif.controller");
  
  const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");
  
  module.exports = (app) => {
    app.post(
      "/api/certifs",
      authenticate,
      checkPermissions("superAdmin", "admin"),
      logActivityMiddleware,
      createCertificate
    );
  };
  