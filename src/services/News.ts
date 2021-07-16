import { NewsRepository } from "../repository/News";
import {
  NewsDeleteInterface,
  NewsFilterInterface,
  NewsInterface,
  NewsResponseClientInterface,
  NewsUpdateInterface,
} from "../entities/News";

const newsRepository = new NewsRepository();
class NewsService {
  async save(data: NewsInterface): Promise<NewsInterface> {
    const savedData = await newsRepository.save(data);

    return savedData;
  }

  async list(
    filter: NewsFilterInterface
  ): Promise<NewsResponseClientInterface> {
    const skip = filter.limit * (filter.page - 1);
    filter.page = skip;

    const listData = await newsRepository.list(filter);

    return listData;
  }

  async unexpiredList(
    filter: NewsFilterInterface
  ): Promise<NewsResponseClientInterface> {
    const skip = filter.limit * (filter.page - 1);
    filter.page = skip;

    const listData = await newsRepository.unexpiredList(filter);

    return listData;
  }

  async show(id: string, companyId: string): Promise<NewsInterface | null> {
    const selectedData = await newsRepository.show(id, companyId);

    return selectedData || null;
  }

  async update(data: NewsUpdateInterface): Promise<boolean> {
    const [updatedData] = await newsRepository.update(data);

    return updatedData > 0;
  }

  async delete(data: NewsDeleteInterface): Promise<boolean> {
    const deletedData = await newsRepository.delete(data);

    return deletedData > 0;
  }
}

export { NewsService };
