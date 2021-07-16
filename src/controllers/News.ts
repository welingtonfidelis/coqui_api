import { Request, Response } from "express";
import { ResponseClientService } from "../services/ResponseClient";
import { CatchError } from "../decorators";
import {
  NewsDeleteInterface,
  NewsFilterInterface,
  NewsInterface,
  NewsUpdateInterface,
} from "../entities/News";
import { NewsService } from "../services/News";

const responseClientService = new ResponseClientService();
const newsService = new NewsService();

class NewsController {
  @CatchError()
  async save(req: Request, res: Response) {
    const data: NewsInterface = req.body;
    const { companyId } = req;
    data.company_id = companyId;

    const savedData = await newsService.save(data);
    const responseHandled = responseClientService.successResponse(savedData);

    return res.json(responseHandled);
  }

  @CatchError()
  async list(req: Request, res: Response) {
    const page = parseInt((req.query?.page as string) ?? "1");
    const limit = parseInt((req.query?.limit as string) ?? "15");
    const title = req.query?.title as string;
    const { companyId } = req;

    const filter: NewsFilterInterface = {
      companyId,
      page,
      limit,
      title,
    };
    const listData = await newsService.list(filter);
    const responseHandled = responseClientService.successResponse(listData);

    return res.json(responseHandled);
  }

  @CatchError()
  async unexpiredList(req: Request, res: Response) {
    const page = parseInt((req.query?.page as string) ?? "1");
    const limit = parseInt((req.query?.limit as string) ?? "15");
    const title = req.query?.title as string;
    const { companyId } = req;

    const filter: NewsFilterInterface = {
      companyId,
      page,
      limit,
      title,
    };
    const listData = await newsService.unexpiredList(filter);
    const responseHandled = responseClientService.successResponse(listData);

    return res.json(responseHandled);
  }

  @CatchError()
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { companyId } = req;

    const selectedData = await newsService.show(id, companyId);
    const responseHandled = responseClientService.successResponse(selectedData);

    return res.json(responseHandled);
  }

  @CatchError()
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { companyId } = req;

    const data: NewsUpdateInterface = {
      id,
      company_id: companyId,
      ...req.body,
    };

    const updatedData = await newsService.update(data);
    const responseHandled = responseClientService.successResponse(updatedData);

    return res.json(responseHandled);
  }

  @CatchError()
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { companyId } = req;
    const data: NewsDeleteInterface = { id, company_id: companyId };

    const deletedData = await newsService.delete(data);
    const responseHandled = responseClientService.successResponse(deletedData);

    return res.json(responseHandled);
  }
}

export { NewsController };
