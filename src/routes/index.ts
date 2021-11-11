import { Router } from "express";
import {
  authValidateIgnoreExpirationMidleware,
  authValidateMidleware,
  roleValidateMidleware,
} from "../middlewares/Auth";
import { noAuthRouter } from "./noAuth";
import { companyRouter } from "./company";
import { userRouter } from "./user";
import { newsRouter } from "./news";
import { messageRouter } from "./message";
import { conversationRouter } from "./conversation";

import { ROLES_ENUM } from "../enums/role";
import { authIgnoreExpirationRouter } from "./AuthIgnoreExpiration";

const router = Router();

// No required token
router.use(noAuthRouter);

// Required valid token, but ignore expired date
router.use(authValidateIgnoreExpirationMidleware);

router.use(authIgnoreExpirationRouter);

// Required valid token
router.use(authValidateMidleware);

router.use(userRouter);
router.use(newsRouter);
router.use(messageRouter);
router.use(conversationRouter);

router.use(roleValidateMidleware(ROLES_ENUM.ADMIN));
router.use(companyRouter);

export { router };
