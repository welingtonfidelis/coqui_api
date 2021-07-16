"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("news", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
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
          foreignKey: true,
          references: {
            model: "companies",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("now"),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("now"),
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addIndex("news", ["title", "expires_in"]);
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("news");
  },
};
