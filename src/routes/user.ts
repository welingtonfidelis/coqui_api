import { Router } from "express";
import { UserController } from "../controllers/User";
import { ROLES_ENUM } from "../enums/role";
import { roleValidateMidleware } from "../middlewares/Auth";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { userListSchema } from "../middlewares/InputValidate/schemas/user/list";
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
    roleValidateMidleware(ROLES_ENUM.MANAGER),
    inputValidateMidleware(userListSchema),
  ],
  userController.list
);

userRouter.get(
  "/users/profile",
  inputValidateMidleware(userShowProfileSchema),
  userController.showProfile
);

userRouter.get(
  "/users/:id",
  [
    roleValidateMidleware(ROLES_ENUM.MANAGER),
    inputValidateMidleware(userShowSchema),
  ],
  userController.show
);

userRouter.put(
  "/users/:id",
  [
    roleValidateMidleware(ROLES_ENUM.MANAGER),
    inputValidateMidleware(userUpdateSchema),
  ],
  userController.update
);

userRouter.patch(
  "/users/:id/status",
  inputValidateMidleware(userUpdateStatusSchema),
  userController.updateStatus
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

export { userRouter };
