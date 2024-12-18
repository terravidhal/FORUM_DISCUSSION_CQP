const {
  findAllStudents,
  findDetailsSingleStudent,
  createNewStudent,
  updateExistingStudent,
  notifsStudent,
  deleteAnExistingStudent,
} = require("../controllers/student.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/students/:id", findDetailsSingleStudent);
  app.get(
    "/api/students",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    findAllStudents
  );
  app.post(
    "/api/notifs",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    notifsStudent
  );
  app.post(
    "/api/students",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    createNewStudent
  );
  app.patch(
    "/api/students/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    updateExistingStudent
  );
  app.delete(
    "/api/students/:id",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deleteAnExistingStudent
  );
};
