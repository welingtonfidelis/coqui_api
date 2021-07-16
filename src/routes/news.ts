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

// ONLY MANAGER OR ADMIN
newsRouter.use(roleValidateMidleware(ROLES_ENUM.MANAGER));

newsRouter.get(
  "/news",
  inputValidateMidleware(newsListSchema),
  newsController.list
);

newsRouter.post(
  "/news",
  inputValidateMidleware(newsSaveSchema),
  newsController.save
);

newsRouter.get(
  "/news/:id",
  inputValidateMidleware(newsShowSchema),
  newsController.show
);

newsRouter.put(
  "/news/:id",
  inputValidateMidleware(newsUpdateSchema),
  newsController.update
);

newsRouter.delete(
  "/news/:id",
  inputValidateMidleware(newsDeleteSchema),
  newsController.delete
);

export { newsRouter };
