import { Router } from "express";
import { CompanyController } from "../controllers/Company";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { companyDeleteSchema } from "../middlewares/InputValidate/schemas/company/delete";
import { companyListSchema } from "../middlewares/InputValidate/schemas/company/list";
import { companySaveSchema } from "../middlewares/InputValidate/schemas/company/save";
import { companyFindSchema } from "../middlewares/InputValidate/schemas/company/find";
import { companyUpdateSchema } from "../middlewares/InputValidate/schemas/company/update";
import { companyUpdateStatusSchema } from "../middlewares/InputValidate/schemas/company/updateStatus";
import { companyFindByEmailSchema } from "../middlewares/InputValidate/schemas/company/findByEmail";
import { companyFindByCnpjSchema } from "../middlewares/InputValidate/schemas/company/findByCnpj";

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
  inputValidateMidleware(companyFindSchema),
  companyController.find
);

companyRouter.get(
  "/companies/email/:email",
  inputValidateMidleware(companyFindByEmailSchema),
  companyController.findByEmail
);

companyRouter.get(
  "/companies/cnpj/:cnpj",
  inputValidateMidleware(companyFindByCnpjSchema),
  companyController.findByCnpj
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
