import { Op } from "sequelize";
import {
  CompanyDeleteInterface,
  CompanyFilterInterface,
  CompanyInterface,
  CompanyUpdateInterface,
} from "../entities/Company";
import { CompanyModel } from "../models/Company";
import { UserModel } from "../models/User";

class CompanyRepository {
  async save(data: CompanyInterface) {
    const savedCompany = await CompanyModel.create(data);

    return savedCompany;
  }

  async list(filter: CompanyFilterInterface) {
    const where: any = {};
    const { page, limit } = filter;

    if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` };
    if (filter.cnpj) where.cnpj = { [Op.like]: `%${filter.cnpj}%` };

    const listCompanies = await CompanyModel.findAndCountAll({
      where,
      offset: page,
      limit,
    });

    return listCompanies;
  }

  async listWithUsers() {
    const listCompanies = await CompanyModel.findAndCountAll({
      include: [
        {
          model: UserModel,
          as: "users",
        },
      ],
    });

    return listCompanies;
  }

  async find(id: string) {
    const selectedUser = await CompanyModel.findOne({
      where: {
        id,
      },
    });

    return selectedUser;
  }

  async findOneByEmailOrCnpj(email: string, cnpj: string) {
    const selectedCompany = await CompanyModel.findOne({
      where: {
        [Op.or]: [{ email }, { cnpj }],
      },
    });

    return selectedCompany;
  }

  async findOneByEmail(email: string) {
    const selectedCompany = await CompanyModel.findOne({
      where: { email },
    });

    return selectedCompany;
  }

  async findOneByCnpj(cnpj: string) {
    const selectedCompany = await CompanyModel.findOne({
      where: { cnpj },
    });

    return selectedCompany;
  }

  async changeStatus(id: string, status: boolean) {
    const updatedCompany = await CompanyModel.update(
      { active: status },
      {
        where: { id },
      }
    );

    return updatedCompany;
  }

  async update(data: CompanyUpdateInterface) {
    const { id } = data;
    const updatedCompany = await CompanyModel.update(data, {
      where: { id },
    });

    return updatedCompany;
  }

  async delete(data: CompanyDeleteInterface) {
    const { id } = data;
    const deletedCompany = await CompanyModel.destroy({
      where: { id },
    });

    return deletedCompany;
  }
}

export { CompanyRepository };
