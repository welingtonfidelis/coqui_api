import { randomHash, removeSpecialCharacters } from "../util";
import {
  CompanyCreatedInterface,
  CompanyDeleteInterface,
  CompanyFilterInterface,
  CompanyInterface,
  CompanyResponseClientInterface,
  CompanyUpdateInterface,
} from "../entities/Company";
import { UserInterface } from "../entities/User";
import { CompanyRepository } from "../repository/Company";
import { UserRepository } from "../repository/User";
import { AppError } from "../errors/AppError";

const companyRepository = new CompanyRepository();
const userRepository = new UserRepository();

class CompanyService {
  async save(data: CompanyInterface): Promise<CompanyCreatedInterface> {
    data.cnpj = removeSpecialCharacters(data.cnpj);

    const companyAlreadyExists = await companyRepository.findOneByEmailOrCnpj(
      data.email,
      data.cnpj
    );

    if (companyAlreadyExists) {
      let message = "CNPJ already in use";

      if (companyAlreadyExists.email === data.email)
        message = "Email already in use";

      throw new AppError(message, 400);
    }

    const savedCompany = await companyRepository.save(data);

    const starterUserPassword = randomHash(8);
    const starterCompanyUser: UserInterface = {
      name: savedCompany.name,
      email: savedCompany.email,
      user: savedCompany.email.split("@")[0],
      birth: new Date(),
      password: starterUserPassword,
      company_id: savedCompany.id,
      active: true,
    };
    const savedUser = await userRepository.save(starterCompanyUser);

    const savedCompanyHandled: CompanyCreatedInterface = {
      id: savedCompany.id,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        user: savedUser.user,
        password: starterUserPassword,
      },
    };

    return savedCompanyHandled;
  }

  async list(filter: CompanyFilterInterface): Promise<CompanyResponseClientInterface> {
    const skip = filter.limit * (filter.page - 1);
    filter.page = skip;

    const listCompanys = await companyRepository.list(filter);

    const listCompanyHandled: CompanyResponseClientInterface = {
      count: listCompanys.count,
      rows: listCompanys.rows.map((item) => item.toListInterface()),
    };

    return listCompanyHandled;
  }

  async show(
    id: string,
  ): Promise<CompanyInterface | null> {
    const selectedUser = await companyRepository.show(id);

    return selectedUser ? selectedUser : null;
  }

  async changeStatus(id: string, status: boolean): Promise<boolean> {
    const [updatedCompany] = await companyRepository.changeStatus(id, status);

    return updatedCompany > 0;
  }

  async update(data: CompanyUpdateInterface): Promise<boolean> {
    const [updatedCompany] = await companyRepository.update(data);

    return updatedCompany > 0;
  }

  async delete(data: CompanyDeleteInterface): Promise<boolean> {
    const deletedCompany = await companyRepository.delete(data);

    return deletedCompany > 0;
  }
}

export { CompanyService };
