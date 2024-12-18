const {
  CreateAdmins,
  login,
  logout,
  findAllAdminsByNodeleted,
  deleteAnExistingUserNew,
  refreshToken,
} = require("../controllers/user.controller");

const { authenticate, checkPermissions } = require("../config/jwt.config");

module.exports = (app) => {
  app.post(
    "/api/register",
    authenticate,
    checkPermissions("superAdmin"),
    CreateAdmins
  );
  app.get(
    "/api/admins",
    authenticate,
    checkPermissions("superAdmin"),
    findAllAdminsByNodeleted
  );
  app.patch(
    "/api/admins/delete/:id",
    authenticate,
    checkPermissions("superAdmin"),
    deleteAnExistingUserNew
  );
  app.post("/api/login", login);
  app.get("/api/refresh-token", refreshToken);
  app.post("/api/logout", logout);
};
