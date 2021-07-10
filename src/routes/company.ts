import { Router } from "express";
import { CompanyController } from "../controllers/Company";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { companyDeleteSchema } from "../middlewares/InputValidate/schemas/company/delete";
import { companyListSchema } from "../middlewares/InputValidate/schemas/company/list";
import { companySaveSchema } from "../middlewares/InputValidate/schemas/company/save";
import { companyShowSchema } from "../middlewares/InputValidate/schemas/company/show";
import { companyUpdateSchema } from "../middlewares/InputValidate/schemas/company/update";
import { companyUpdateStatusSchema } from "../middlewares/InputValidate/schemas/company/updateStatus";

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.post(
  "/companies",
  inputValidateMidleware(companySaveSchema),
  companyController.save
);

companyRouter.get(
  "/companies",
  inputValidateMidleware(companyListSchema),
  companyController.list
);

companyRouter.get(
  "/companies/:id",
  inputValidateMidleware(companyShowSchema),
  companyController.show
);

companyRouter.patch(
  "/companies/:id/status",
  inputValidateMidleware(companyUpdateStatusSchema),
  companyController.changeStatus
);

companyRouter.put(
  "/companies/:id",
  inputValidateMidleware(companyUpdateSchema),
  companyController.update
);

companyRouter.delete(
  "/companies/:id",
  inputValidateMidleware(companyDeleteSchema),
  companyController.delete
);

export { companyRouter };
