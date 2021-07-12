"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("users", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
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
        profile_image: {
          type: Sequelize.STRING,
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
        active: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        role: {
          allowNull: false,
          type: Sequelize.ENUM("user", "manager", "admin"),
          defaultValue: "user",
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
        queryInterface.addIndex("users", ["user", "email", "role"]);
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
