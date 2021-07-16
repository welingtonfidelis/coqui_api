import { Op } from "sequelize";
import {
  NewsDeleteInterface,
  NewsFilterInterface,
  NewsInterface,
  NewsUpdateInterface,
} from "../entities/News";
import { NewsModel } from "../models/News";

class NewsRepository {
  async save(data: NewsInterface) {
    const savedData = await NewsModel.create(data);

    return savedData;
  }

  async list(filter: NewsFilterInterface) {
    const { companyId, page, limit, title } = filter;
    const where: any = {
      company_id: companyId,
    };

    if (title) where.title = { [Op.iLike]: `%${title}%` };

    const listData = await NewsModel.findAndCountAll({
      where,
      offset: page,
      limit,
    });

    return listData;
  }

  async unexpiredList(filter: NewsFilterInterface) {
    const { companyId, page, limit, title } = filter;
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    const where: any = {
      company_id: companyId,
      expires_in: { [Op.gte]: today }
    };

    if (title) where.title = { [Op.iLike]: `%${title}%` };

    const listData = await NewsModel.findAndCountAll({
      where,
      offset: page,
      limit,
    });

    return listData;
  }

  async show(id: string, company_id: string) {
    const selectedData = await NewsModel.findOne({
      where: {
        id,
        company_id,
      },
    });

    return selectedData;
  }

  async update(data: NewsUpdateInterface) {
    const { id, company_id } = data;

    const updatedData = await NewsModel.update(data, {
      where: { id, company_id },
    });

    return updatedData;
  }

  async delete(data: NewsDeleteInterface) {
    const { id, company_id } = data;
    const deletedData = await NewsModel.destroy({
      where: { id, company_id },
    });

    return deletedData;
  }
}

export { NewsRepository };
