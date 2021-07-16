import { Router } from "express";
import { NewsController } from "../controllers/News";
import { ROLES_ENUM } from "../enums/role";
import { roleValidateMidleware } from "../middlewares/Auth";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { newsDeleteSchema } from "../middlewares/InputValidate/schemas/news/delete";
import { newsListSchema } from "../middlewares/InputValidate/schemas/news/list";
import { newsSaveSchema } from "../middlewares/InputValidate/schemas/news/save";
import { newsShowSchema } from "../middlewares/InputValidate/schemas/news/show";
import { newsUpdateSchema } from "../middlewares/InputValidate/schemas/news/update";

const newsRouter = Router();
const newsController = new NewsController();

newsRouter.get(
  "/news/unexpired",
  inputValidateMidleware(newsListSchema),
  newsController.unexpiredList
);

newsRouter.get(
  "/news",
  [
    inputValidateMidleware(newsListSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  newsController.list
);

newsRouter.post(
  "/news",
  [
    inputValidateMidleware(newsSaveSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  newsController.save
);

newsRouter.get(
  "/news/:id",
  [
    inputValidateMidleware(newsShowSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  newsController.show
);

newsRouter.put(
  "/news/:id",
  [
    inputValidateMidleware(newsUpdateSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  newsController.update
);

newsRouter.delete(
  "/news/:id",
  [
    inputValidateMidleware(newsDeleteSchema),
    roleValidateMidleware(ROLES_ENUM.MANAGER),
  ],
  newsController.delete
);

export { newsRouter };
