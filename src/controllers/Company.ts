import { Request, Response } from "express";
import { CatchError } from "../decorators";
import {
  CompanyDeleteInterface,
  CompanyFilterInterface,
  CompanyInterface,
  CompanyUpdateInterface,
} from "../entities/Company";
import { CompanyService } from "../services/Company";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const companyService = new CompanyService();

class CompanyController {
  @CatchError()
  async save(req: Request, res: Response) {
    const data: CompanyInterface = req.body;

    const savedCompany = await companyService.save(data);
    const responseHandled = responseClientService.successResponse(savedCompany);

    return res.json(responseHandled);
  }

  @CatchError()
  async list(req: Request, res: Response) {
    const page = parseInt((req.query?.page as string) ?? "1");
    const limit = parseInt((req.query?.limit as string) ?? "15");
    const name = req.query?.name as string;
    const cnpj = req.query?.cnpj as string;

    const filter: CompanyFilterInterface = {
      page,
      limit,
      name,
      cnpj,
    };
    const listCompanys = await companyService.list(filter);
    const responseHandled = responseClientService.successResponse(listCompanys);

    return res.json(responseHandled);
  }

  @CatchError()
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const selectedCompany = await companyService.show(id);
    const responseHandled =
      responseClientService.successResponse(selectedCompany);

    return res.json(responseHandled);
  }

  @CatchError()
  async changeStatus(req: Request, res: Response) {
    const { status } = req.body;
    const { id } = req.params;

    const updatedCompany = await companyService.changeStatus(id, status);
    const responseHandled =
      responseClientService.successResponse(updatedCompany);

    return res.json(responseHandled);
  }

  @CatchError()
  async update(req: Request, res: Response) {
    const { name, logo, cnpj, email, active } = req.body;
    const { id } = req.params;
    const data: CompanyUpdateInterface = {
      id,
      name,
      logo,
      cnpj,
      email,
      active,
    };

    const updatedcompany = await companyService.update(data);
    const responseHandled =
      responseClientService.successResponse(updatedcompany);

    return res.json(responseHandled);
  }

  @CatchError()
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data: CompanyDeleteInterface = { id };

    const deletedcompany = await companyService.delete(data);
    const responseHandled =
      responseClientService.successResponse(deletedcompany);

    return res.json(responseHandled);
  }
}

export { CompanyController };
