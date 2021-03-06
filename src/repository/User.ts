import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";
import {
  UserDeleteInterface,
  UserFilterInterface,
  UserForChatFilterInterface,
  UserInterface,
  UserUpdateInterface,
  UserUpdatePasswordInterface,
  UserUpdateProfileInterface,
  UserUpdateStatusInterface,
} from "../entities/User";
import { CompanyModel } from "../models/Company";

const saltRounds = 10;
class UserRepository {
  async save(data: UserInterface) {
    data.password = bcrypt.hashSync(data.password, saltRounds);

    const savedUser = await UserModel.create(data);

    return savedUser;
  }

  async list(filter: UserFilterInterface) {
    const { companyId, page, limit } = filter;
    const where: any = {
      company_id: companyId,
    };

    if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` };
    if (filter.email) where.email = { [Op.iLike]: `%${filter.email}%` };

    const listUsers = await UserModel.findAndCountAll({
      where,
      offset: page,
      limit,
    });

    return listUsers;
  }

  async listForChat(filter: UserForChatFilterInterface) {
    const { userId, companyId } = filter;

    const listUsers = await UserModel.findAndCountAll({
      where: { company_id: companyId, active: true, id: { [Op.not]: userId } },
    });

    return listUsers;
  }

  async find(id: string, company_id: string) {
    const selectedUser = await UserModel.findOne({
      where: {
        id,
        company_id,
      },
    });

    return selectedUser;
  }

  async findWithCompany(id: string, company_id: string) {
    const selectedUser = await UserModel.findOne({
      where: {
        id,
        company_id,
      },
      include: [
        {
          model: CompanyModel,
          as: "company",
          required: true,
          attributes: ["name", "active"],
        },
      ],
    });

    return selectedUser;
  }

  async findOneByUserOrEmail(user: string, email = user) {
    const selectedUser = await UserModel.findOne({
      where: {
        [Op.or]: [{ user }, { email }],
      },
      include: [
        {
          model: CompanyModel,
          as: "company",
          required: true,
          attributes: ["name", "active"],
        },
      ],
    });

    return selectedUser;
  }

  async findOneByEmail(email: string, id?: string) {
    const where:any = { email }

    if(id) where[Op.not] = { id }

    const selectedUser = await UserModel.findOne({ where });

    return selectedUser;
  }

  async findOneByUser(user: string, id?: string) {
    const where:any = { user }

    if(id) where[Op.not] = { id }

    const selectedUser = await UserModel.findOne({ where });

    return selectedUser;
  }

  async update(data: UserUpdateInterface) {
    const { id, company_id } = data;

    const updatedUser = await UserModel.update(data, {
      where: { id, company_id },
    });

    return updatedUser;
  }

  async updateStatus(data: UserUpdateStatusInterface) {
    const { id, company_id } = data;

    const updatedUser = await UserModel.update(data, {
      where: { id, company_id },
    });

    return updatedUser;
  }

  async updateProfile(data: UserUpdateProfileInterface) {
    const { id, company_id } = data;

    const updatedUser = await UserModel.update(data, {
      where: { id, company_id },
    });

    return updatedUser;
  }

  async updatePassword(data: UserUpdatePasswordInterface) {
    const { id, company_id } = data;
    const password = bcrypt.hashSync(data.new_password, saltRounds);

    const updatedUser = await UserModel.update(
      {
        password,
      },
      {
        where: { id, company_id },
      }
    );

    return updatedUser;
  }

  async delete(data: UserDeleteInterface) {
    const { id, company_id } = data;
    const deletedUser = await UserModel.destroy({
      where: { id, company_id },
    });

    return deletedUser;
  }
}

export { UserRepository };
