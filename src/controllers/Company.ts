import { Request, Response } from "express";
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
  async save(req: Request, res: Response) {
    try {
      const data: CompanyInterface = req.body;

      const savedCompany = await companyService.save(data);
      const responseHandled = responseClientService.successResponse(savedCompany);

      return res.json(responseHandled);
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  }

  async list(req: Request, res: Response) {
    try {
      const page = parseInt(req.query?.page as string ?? '1');
      const limit = parseInt(req.query?.limit as string ?? '15');
      const name = req.query?.name as string;
      const cnpj = req.query?.cnpj as string;

      const filter: CompanyFilterInterface = {
          page, limit, name, cnpj
      }
      const listCompanys = await companyService.list(filter);
      const responseHandled = responseClientService.successResponse(listCompanys);

      return res.json(responseHandled);
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const selectedCompany = await companyService.show(id);
      const responseHandled =
        responseClientService.successResponse(selectedCompany);

      return res.json(responseHandled);
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  }

  async changeStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const { id } = req.params;

      const updatedCompany = await companyService.changeStatus(id, status);
      const responseHandled =
        responseClientService.successResponse(updatedCompany);

      return res.json(responseHandled);
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  }

  async update(req: Request, res: Response) {
    try {
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
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: CompanyDeleteInterface = { id };

      const deletedcompany = await companyService.delete(data);
      const responseHandled =
        responseClientService.successResponse(deletedcompany);

      return res.json(responseHandled);
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  }
}

export { CompanyController };
