const {
  findAllComment,
  findDetailsSingleComment,
  createNewComment,
  deleteComment,
  voteOnComment,
} = require("../controllers/comment.controller");

const { authenticate, checkPermissions, logActivityMiddleware } = require("../config/jwt.config");


module.exports = (app) => {
  app.post(
    "/api/comment",
    authenticate,
    logActivityMiddleware,
    createNewComment
  );
  app.get(
    "/api/comments",
    authenticate,
    logActivityMiddleware,
    findAllComment
  );
  app.get(
    "/api/comments/:id",
    authenticate,
    logActivityMiddleware,
    findDetailsSingleComment
  );

  app.patch(
    "/api/subjects/:commentId",
    authenticate,
    logActivityMiddleware,
    voteOnComment
  );

  app.delete(
    "/api/comments/:commentId",
    authenticate,
    checkPermissions("superAdmin", "admin"),
    logActivityMiddleware,
    deleteComment
  );
};
