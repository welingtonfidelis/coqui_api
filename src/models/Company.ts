import Sequelize, { Association, HasMany, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { CompanyInterface, CompanyListInterface } from "../entities/Company";
import { UserModel } from "./User";

// interface CompanyCreationInterface extends Optional<OngInterface, "id"> { }

class CompanyModel extends Model<CompanyInterface> {
  id!: string;
  name!: string;
  logo!: string;
  cnpj!: string;
  email!: string;
  active!: boolean;

  // timestamps!
  readonly created_at!: Date;
  readonly updated_at!: Date;

  readonly users?: UserModel[]; // Note this is optional since it's only populated when explicitly requested in code

  static associations: {
    users: Association<CompanyModel, UserModel>;
  };

  toListInterface(): CompanyListInterface {
    return {
      id: this.id,
      name: this.name,
      cnpj: this.cnpj,
      email: this.email,
      logo: this.logo,
      active: this.active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

CompanyModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    logo: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    cnpj: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    active: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "companies",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);

CompanyModel.hasMany(UserModel, {
  sourceKey: "id",
  foreignKey: "company_id",
  onDelete: "CASCADE",
  as: "users",
});

UserModel.belongsTo(CompanyModel, {
  foreignKey: "company_id",
  targetKey: "id",
  as: "company",
});

export { CompanyModel };
