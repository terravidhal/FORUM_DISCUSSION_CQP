const {
  findAllFieldsByNodeleted,
  findDetailsSingleField,
  createNewField,
  updateExistingField,
  deleteAnExistingField,
} = require("../controllers/field.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");

module.exports = (app) => {
  app.get(
    "/api/fieldsNotD",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    findAllFieldsByNodeleted
  );
  app.get(
    "/api/fields/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    findDetailsSingleField
  );
  app.post(
    "/api/fields",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    createNewField
  );
  app.patch(
    "/api/fields/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    updateExistingField
  );
  app.delete(
    "/api/fields/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deleteAnExistingField
  );
};
