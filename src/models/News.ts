import Sequelize, { Model } from "sequelize";
import { sequelize } from "../database/connection";
import { NewsInterface } from "../entities/News";
import { CompanyModel } from "./Company";

class NewsModel extends Model<NewsInterface> {
  id!: string;
  title!: string;
  description!: string;
  expires_in!: Date;
  company_id!: string;

  // timestamps!
  readonly created_at!: Date;
  readonly updated_at!: Date;
  readonly company!: CompanyModel;
}

NewsModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    expires_in: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
    },
    company_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "news",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);

export { NewsModel };
