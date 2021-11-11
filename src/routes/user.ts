import { Router } from "express";
import { UserController } from "../controllers/User";
import { ROLES_ENUM } from "../enums/role";
import { roleValidateMidleware } from "../middlewares/Auth";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { userDeleteSchema } from "../middlewares/InputValidate/schemas/user/delete";
import { userListSchema } from "../middlewares/InputValidate/schemas/user/list";
import { userListForChatSchema } from "../middlewares/InputValidate/schemas/user/listForChat";
import { userSaveSchema } from "../middlewares/InputValidate/schemas/user/save";
import { userFindSchema } from "../middlewares/InputValidate/schemas/user/find";
import { userFindProfileSchema } from "../middlewares/InputValidate/schemas/user/findProfile";
import { userUpdateSchema } from "../middlewares/InputValidate/schemas/user/update";
import { userUpdatePasswordSchema } from "../middlewares/InputValidate/schemas/user/updatePassword";
import { userUpdateProfileSchema } from "../middlewares/InputValidate/schemas/user/updateProfile";
import { userUpdateResetedPasswordSchema } from "../middlewares/InputValidate/schemas/user/updateResetedPassword";
import { userUpdateStatusSchema } from "../middlewares/InputValidate/schemas/user/updateStatus";
import { userFindByEmailSchema } from "../middlewares/InputValidate/schemas/user/findByEmail";
import { userFindByUserSchema } from "../middlewares/InputValidate/schemas/user/findByUser";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/users/chat",
  inputValidateMidleware(userListForChatSchema),
  userController.listForChat
);

userRouter.get(
  "/users/profile",
  inputValidateMidleware(userFindProfileSchema),
  userController.findProfile
);

userRouter.patch(
  "/users/profile",
  inputValidateMidleware(userUpdateProfileSchema),
  userController.updateProfile
);

userRouter.patch(
  "/users/profile/update-password",
  inputValidateMidleware(userUpdatePasswordSchema),
  userController.updatePassword
);

userRouter.patch(
  "/users/profile/update-reseted-password",
  inputValidateMidleware(userUpdateResetedPasswordSchema),
  userController.updateResetedPassword
);

userRouter.post(
  "/users",
  [
    inputValidateMidleware(userSaveSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.save
);

userRouter.get(
  "/users",
  [
    inputValidateMidleware(userListSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.list
);

userRouter.get(
  "/users/:id",
  [
    inputValidateMidleware(userFindSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.find
);

userRouter.get(
  "/users/email/:email",
  [
    inputValidateMidleware(userFindByEmailSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.findByEmail
);

userRouter.get(
  "/users/user/:user",
  [
    inputValidateMidleware(userFindByUserSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.findByUser
);

userRouter.put(
  "/users/:id",
  [
    inputValidateMidleware(userUpdateSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.update
);

userRouter.patch(
  "/users/:id/status",
  [
    inputValidateMidleware(userUpdateStatusSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.updateStatus
);

userRouter.delete(
  "/users/:id",
  [
    inputValidateMidleware(userDeleteSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  userController.delete
);

export { userRouter };
