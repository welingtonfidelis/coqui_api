import { Router } from "express";
import { UserController } from "../controllers/User";
import { ROLES_ENUM } from "../enums/role";
import { roleValidateMidleware } from "../middlewares/Auth";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { userDeleteSchema } from "../middlewares/InputValidate/schemas/user/delete";
import { userListSchema } from "../middlewares/InputValidate/schemas/user/list";
import { userListForChatSchema } from "../middlewares/InputValidate/schemas/user/listForChat";
import { userSaveSchema } from "../middlewares/InputValidate/schemas/user/save";
import { userShowSchema } from "../middlewares/InputValidate/schemas/user/show";
import { userShowProfileSchema } from "../middlewares/InputValidate/schemas/user/showProfile";
import { userUpdateSchema } from "../middlewares/InputValidate/schemas/user/update";
import { userUpdatePasswordSchema } from "../middlewares/InputValidate/schemas/user/updatePassword";
import { userUpdateProfileSchema } from "../middlewares/InputValidate/schemas/user/updateProfile";
import { userUpdateResetedPasswordSchema } from "../middlewares/InputValidate/schemas/user/updateResetedPassword";
import { userUpdateStatusSchema } from "../middlewares/InputValidate/schemas/user/updateStatus";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/users/chat",
  inputValidateMidleware(userListForChatSchema),
  userController.listForChat
);

userRouter.get(
  "/users/profile",
  inputValidateMidleware(userShowProfileSchema),
  userController.showProfile
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

// ONLY MANAGER OR ADMIN
userRouter.use(roleValidateMidleware(ROLES_ENUM.MANAGER));

userRouter.post(
  "/users",
  inputValidateMidleware(userSaveSchema),
  userController.save
);

userRouter.get(
  "/users",
  inputValidateMidleware(userListSchema),
  userController.list
);

userRouter.get(
  "/users/:id",
  inputValidateMidleware(userShowSchema),
  userController.show
);

userRouter.put(
  "/users/:id",
  inputValidateMidleware(userUpdateSchema),
  userController.update
);

userRouter.patch(
  "/users/:id/status",
  inputValidateMidleware(userUpdateStatusSchema),
  userController.updateStatus
);

userRouter.delete(
  "/users/:id",
  inputValidateMidleware(userDeleteSchema),
  userController.delete
);

export { userRouter };
