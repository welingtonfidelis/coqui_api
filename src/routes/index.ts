import { Router } from "express";
import {
  authValidateMidleware,
  roleValidateMidleware,
} from "../middlewares/Auth";
import { noAuthRouter } from "./noAuth";
import { companyRouter } from "./company";
import { userRouter } from "./user";
import { ROLES_ENUM } from "../enums/role";

const router = Router();

router.use(noAuthRouter);

router.use(authValidateMidleware);

router.use(userRouter);

router.use(roleValidateMidleware(ROLES_ENUM.ADMIN));
router.use(companyRouter);

export { router };
