const {
    FindAllStudAndCertifCollections,
    FindAlllistCollections,
  } = require("../controllers/chart.controller");
  
  const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");
  
  module.exports = (app) => {
    app.get(
      "/api/allCollections",
      authenticate,
      checkPermissions("superAdmin", "admin"),
      logActivityMiddleware,
      FindAlllistCollections
    );
    app.get(
      "/api/allStudCertif",
      authenticate,
      checkPermissions("superAdmin", "admin"),
      logActivityMiddleware,
      FindAllStudAndCertifCollections
    );
};
  