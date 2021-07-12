import Sequelize, { ENUM, Model } from "sequelize";
import { sequelize } from "../database/connection";
import {
  UserInterface,
  UserListForChatInterface,
  UserListInterface,
  UserProfileInterface,
} from "../entities/User";
import { CompanyModel } from "./Company";

class UserModel extends Model<UserInterface> {
  id!: string;
  name!: string;
  email!: string;
  phone!: string;
  user!: string;
  birth!: Date;
  password!: string;
  address!: string;
  profile_image!: string;
  company_id!: string;
  active!: boolean;
  role!: string;

  // timestamps!
  readonly created_at!: Date;
  readonly updated_at!: Date;
  readonly company!: CompanyModel;

  toListInterface(): UserListInterface {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      user: this.user,
      birth: this.birth,
      address: this.address,
      profile_image: this.profile_image,
      active: this.active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  toListForChatInterface(): UserListForChatInterface {
    return {
      id: this.id,
      name: this.name,
      profile_image: this.profile_image,
    };
  }

  toProfileInterface(): UserProfileInterface {
    return {
      name: this.name,
      email: this.email,
      address: this.address,
      profile_image: this.profile_image,
      birth: this.birth,
      phone: this.phone,
      user: this.user,
      active: this.active,
    };
  }
}

UserModel.init(
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
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
    },
    user: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    birth: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    address: {
      type: Sequelize.STRING,
    },
    profile_image: {
      type: Sequelize.STRING,
    },
    active: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    company_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("user", "manager", "admin"),
    },
  },
  {
    sequelize,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);

export { UserModel };
